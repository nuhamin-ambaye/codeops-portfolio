import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { getOrderForUser } from "../../../lib/db";
import { getSession } from "../../../lib/session";
import OrderStatus from "../history/OrderStatus";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Order status",
  description: "Check the current status of your Addis Eats order.",
  robots: { index: false, follow: false },
};

export default async function OrderDetailsPage({ params }) {
  const { id } = await params;
  const user = await getSession();
  if (!user) redirect(`/signin?next=${encodeURIComponent(`/orders/${id}`)}`);
  const order = await getOrderForUser(id, user.id);
  if (!order) notFound();

  return (
    <main className="page">
      <h1>Order details</h1>
      <section className="card order-details">
        <h2>{order.dishName || "Addis Eats order"}</h2>
        <p>Order reference: {order.id}</p>
        <p>Quantity: {order.quantity || 1}</p>
        <p>Total: {Number(order.price || 0) * Number(order.quantity || 1)} {order.currency || "ETB"}</p>
        <p>Placed: {new Date(order.createdAt).toLocaleString("en-ET")}</p>
        <OrderStatus orderId={order.id} initialStatus={order.status} />
        <p className="muted">Status refreshes every five seconds while this page is open.</p>
        <Link href="/orders/history">Back to order history</Link>
      </section>
    </main>
  );
}
