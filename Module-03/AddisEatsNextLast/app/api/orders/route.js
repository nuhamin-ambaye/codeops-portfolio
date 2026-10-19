import { createOrder, getDish } from "../../../lib/db";
import { getSession } from "../../../lib/session";
import { orderSchema } from "../../../lib/schema";

export async function POST(request) {
  let body;

  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Request body must be valid JSON" }, { status: 400 });
  }

  const result = orderSchema.safeParse(body);
  if (!result.success) {
    return Response.json(
      {
        error: "Validation failed",
        fieldErrors: result.error.flatten().fieldErrors,
      },
      { status: 422 }
    );
  }

  const user = await getSession();
  if (!user) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }
  if (!result.data.dishId) {
    return Response.json({ error: "A dishId is required" }, { status: 422 });
  }

  let dish = null;
  if (result.data.dishId) {
    dish = await getDish(result.data.dishId);
    if (!dish || !dish.available) {
      return Response.json({ error: "Dish is unavailable" }, { status: 404 });
    }
  }

  const order = await createOrder({
    ...result.data,
    dishName: dish?.name,
    price: dish?.price,
    currency: dish?.currency || "ETB",
    userId: user.id,
  });

  return Response.json(order, { status: 201 });
}
