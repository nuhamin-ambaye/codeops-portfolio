import { getDishesPage } from "../../lib/db";
import MenuSearch from "../../components/MenuSearch";

export const revalidate = 3600;
export const metadata = {
  title: "Ethiopian Food Menu",
  description: "Explore Ethiopian dishes on the Addis Eats menu, with prices in Ethiopian birr.",
  alternates: { canonical: "/menu" },
  openGraph: { title: "Addis Eats Menu", description: "Discover Ethiopian dishes on Addis Eats." },
};

export default async function MenuPage({ searchParams }) {
  const params = await searchParams;
  const page = Math.max(1, Number(params?.page) || 1);
  const query = typeof params?.q === "string" ? params.q.slice(0, 80) : "";
  const initialPage = await getDishesPage({ query, page, pageSize: 3 });

  return (
    <main className="page">
      <h1>Our Menu</h1>
      <p>Find a favourite Ethiopian dish and add it to your cart.</p>
      <MenuSearch initialPage={initialPage} initialQuery={query} />
    </main>
  );
}
