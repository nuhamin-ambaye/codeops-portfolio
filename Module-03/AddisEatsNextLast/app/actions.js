"use server";

import { revalidatePath } from "next/cache";
import { createOrder, getDish, getOrder, getOrderForUser, markCancelled, updateOrderStatus } from "../lib/db";
import { getSession } from "../lib/session";
import { orderSchema } from "../lib/schema";

export async function placeOrder(previousState, formData) {
  const user = await getSession();
  if (!user) {
    return { error: "You must be signed in to place an order." };
  }

  let items;
  try {
    items = JSON.parse(String(formData.get("cartItems") || "[]"));
  } catch {
    return { error: "Your cart data could not be read. Please return to the cart and try again." };
  }

  if (!Array.isArray(items) || items.length === 0) {
    return { error: "Your cart is empty. Add a dish before placing an order." };
  }

  const name = String(formData.get("name") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const notes = String(formData.get("notes") || "").trim();
  const validatedItems = [];

  // Validate every line before creating any order, so a bad line cannot
  // leave only part of the cart saved.
  for (const item of items) {
    const result = orderSchema.safeParse({
      name,
      phone,
      dishId: String(item?.id || ""),
      quantity: Number(item?.quantity),
      notes,
    });

    if (!result.success) {
      return {
        fieldErrors: result.error.flatten().fieldErrors,
        error: "Please correct the highlighted information.",
      };
    }

    const dish = await getDish(result.data.dishId);
    if (!dish || !dish.available) {
      return { error: "One of the dishes in your cart is unavailable. Please update your cart." };
    }

    validatedItems.push({ data: result.data, dish });
  }

  const createdOrders = [];
  for (const { data, dish } of validatedItems) {
    const order = await createOrder({
      ...data,
      dishName: dish.name,
      price: dish.price,
      currency: dish.currency,
      userId: user.id,
    });
    createdOrders.push(order);
  }

  revalidatePath("/orders/history");
  const total = createdOrders.reduce((sum, order) => sum + order.price * order.quantity, 0);
  return { success: true, orderIds: createdOrders.map((order) => order.id), total };
}

export async function cancelOrder(orderId) {
  const user = await getSession();
  if (!user) {
    throw new Error("Not signed in");
  }

  const order = await getOrderForUser(orderId, user.id);
  if (!order) {
    throw new Error("Order not found");
  }
  if (order.userId !== user.id) {
    throw new Error("You are not allowed to cancel this order");
  }
  if (order.status !== "PENDING") {
    throw new Error("Only pending orders can be cancelled");
  }

  await markCancelled(orderId);
  revalidatePath("/orders/history");
}


export async function setKitchenOrderStatus(orderId, nextStatus) {
  const user = await getSession();
  if (!user) throw new Error("You must be signed in.");
  if (user.role !== "staff") throw new Error("Only staff can update kitchen orders.");
  const allowedNextStatuses = {
    PENDING: "PREPARING",
    PREPARING: "READY",
    READY: "COMPLETED",
  };
  // Staff can update any order, so look it up only after the role check.
  const order = await getOrder(orderId);
  if (!order) throw new Error("Order not found");
  if (allowedNextStatuses[order.status] !== nextStatus) {
    throw new Error("That order status transition is not allowed.");
  }

  await updateOrderStatus(orderId, nextStatus);
  revalidatePath("/kitchen");
  revalidatePath("/orders/history");
}
