import Link from "next/link";
import { redirect } from "next/navigation";
import { getOrdersForUser } from "../../../lib/db";
import { getSession } from "../../../lib/session";
import CancelOrderButton from "./CancelOrderButton";
import OrderStatus from "./OrderStatus";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Order History",
  description: "Review your Addis Eats orders and their current status.",
  robots: { index: false, follow: false },
};

export default async function OrderHistoryPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/orders/history");
  const orders = (await getOrdersForUser(user.id)).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

  return (
    <main className="page">
      <h1>Order History</h1>
      {!orders.length ? (
        <section className="card">
          <p>You have no orders yet.</p>
          <Link className="button" href="/menu">Explore the menu</Link>
        </section>
      ) : (
        <div className="order-list">
          {orders.map((order) => (
            <article className="card order-row" key={order.id}>
              <div>
                <h2><Link href={`/orders/${order.id}`}>{order.dishName || "Addis Eats order"}</Link></h2>
                <p>Order: {order.id}</p>
                <p>Quantity: {order.quantity || 1}</p>
                <p>Total: {Number(order.price || 0) * Number(order.quantity || 1)} {order.currency || "ETB"}</p>
                <OrderStatus orderId={order.id} initialStatus={order.status} />
              </div>
              {order.status === "PENDING" && <CancelOrderButton orderId={order.id} />}
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
