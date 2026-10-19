import { redirect } from "next/navigation";
import { getAllOrders } from "../../lib/db";
import { getSession } from "../../lib/session";
import KitchenOrderActions from "./KitchenOrderActions";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Kitchen orders",
  description: "Staff-only Addis Eats order preparation queue.",
  robots: { index: false, follow: false },
};

export default async function KitchenPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/kitchen");
  if (user.role !== "staff") redirect("/not-authorized");
  const orders = (await getAllOrders()).sort((a, b) => a.createdAt.localeCompare(b.createdAt));

  return (
    <main className="page">
      <h1>Kitchen queue</h1>
      <p>Staff-only order status management.</p>
      {!orders.length ? <section className="card"><p>No orders are waiting.</p></section> : (
        <div className="order-list">
          {orders.map((order) => (
            <article className="card order-row" key={order.id}>
              <div>
                <h2>{order.dishName || "Addis Eats order"}</h2>
                <p>Reference: {order.id}</p>
                <p>Customer: {order.name} · {order.phone}</p>
                <p>Status: <strong>{order.status}</strong></p>
              </div>
              <KitchenOrderActions orderId={order.id} status={order.status} />
            </article>
          ))}
        </div>
      )}
    </main>
  );
}
