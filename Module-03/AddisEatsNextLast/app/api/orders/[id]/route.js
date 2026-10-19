import { getOrderForUser } from "../../../../lib/db";
import { getSession } from "../../../../lib/session";

export const dynamic = "force-dynamic";

export async function GET(request, { params }) {
  const user = await getSession();
  if (!user) {
    return Response.json({ error: "Not signed in" }, { status: 401 });
  }

  const { id } = await params;
  // Query by both order id and the authenticated user's id.
  const order = await getOrderForUser(id, user.id);
  if (!order) {
    // Use the same response for missing and other users' orders.
    return Response.json({ error: "No such order" }, { status: 404 });
  }

  return Response.json(
    { id: order.id, status: order.status, createdAt: order.createdAt },
    { headers: { "Cache-Control": "no-store" } }
  );
}
