import { notFound } from "next/navigation";
import { getDish, getDishes } from "../../../lib/dishes";
import AddToCartButton from "../../../components/AddToCartButton";

export async function generateStaticParams() {
  const dishes = await getDishes();
  return dishes.map((dish) => ({ id: dish.id }));
}

export default async function DishPage({ params }) {
  const dish = await getDish(params.id);
  if (!dish) notFound();
  return (
    <main className="page">
      <div className="card">
        <div className="card-image">{dish.emoji}</div>
        <h1>{dish.name}</h1>
        <p>{dish.description}</p>
        <p className="price">{dish.price} ETB</p>
        <AddToCartButton dish={dish} />
      </div>
    </main>
  );
}
