import { getDishesPage } from "../../../lib/db";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query = (searchParams.get("q") || "").slice(0, 80);
  const page = Math.max(1, Number(searchParams.get("page")) || 1);
  const result = await getDishesPage({ query, page, pageSize: 3 });
  return Response.json(result, { headers: { "Cache-Control": "no-store" } });
}
