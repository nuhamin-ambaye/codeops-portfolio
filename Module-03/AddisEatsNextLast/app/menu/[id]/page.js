import { notFound } from "next/navigation";
import { getDish, getDishes } from "../../../lib/db";
import { siteUrl } from "../../../lib/site";
import AddToCartButton from "../../../components/AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) return { title: "Dish not found", robots: { index: false, follow: false } };

  const description = `${dish.description} Price: ${dish.price} ETB.`;
  const canonical = `/menu/${dish.id}`;
  return {
    title: dish.name,
    description,
    alternates: { canonical },
    openGraph: {
      type: "article",
      title: `${dish.name} | Addis Eats`,
      description,
      url: canonical,
      images: [{ url: `/menu/${dish.id}/opengraph-image`, width: 1200, height: 630, alt: `${dish.name} menu preview` }],
    },
    twitter: { card: "summary_large_image", images: [`/menu/${dish.id}/opengraph-image`] },
  };
}

export default async function DishPage({ params }) {
  const { id } = await params;
  const dish = await getDish(id);
  if (!dish) notFound();

  const dishUrl = new URL(`/menu/${dish.id}`, siteUrl).toString();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MenuItem",
    name: dish.name,
    description: dish.description,
    offers: {
      "@type": "Offer",
      price: dish.price,
      priceCurrency: dish.currency,
      availability: dish.available ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      url: dishUrl,
    },
  };

  return (
    <main className="page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <div className="card">
        <div className="card-image" role="img" aria-label={`${dish.name} emoji placeholder`}>{dish.emoji || "🍽️"}</div>
        <h1>{dish.name}</h1>
        <p>{dish.description}</p>
        <p className="price">{dish.price} ETB</p>
        <AddToCartButton dish={dish} />
      </div>
    </main>
  );
}
