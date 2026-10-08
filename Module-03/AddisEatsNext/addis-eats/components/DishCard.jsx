import Link from "next/link";
import AddToCartButton from "./AddToCartButton";

export default function DishCard({ dish }) {
  return (
    <article className="card">
      <div className="card-image">{dish.emoji}</div>
      <div className="card-top">
        <h2>{dish.name}</h2>
        <button className="heart" aria-label="favorite">♡</button>
      </div>
      <p>{dish.description}</p>
      <p className="price">{dish.price} ETB</p>
      <AddToCartButton dish={dish} /> {" "}
      <Link href={`/menu/${dish.id}`}>View</Link>
    </article>
  );
}
