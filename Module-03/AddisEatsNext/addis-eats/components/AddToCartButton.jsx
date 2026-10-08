"use client";

import { useCart } from "../app/providers";

export default function AddToCartButton({ dish }) {
  const { addToCart } = useCart();
  return <button className="button" onClick={() => addToCart(dish)}>Add to cart</button>;
}
