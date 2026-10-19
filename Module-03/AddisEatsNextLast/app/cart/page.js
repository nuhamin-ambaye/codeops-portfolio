"use client";

import Link from "next/link";
import { useCart } from "../providers";

export default function CartPage() {
  const { cart, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <main className="page">
      <h1>Your Cart</h1>
      {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((item) => (
        <div key={item.id} className="card" style={{marginBottom:12, display:"flex", justifyContent:"space-between"}}>
          <span>{item.name} × {item.quantity}</span><span>{item.price * item.quantity} ETB <button onClick={() => removeFromCart(item.id)}>Remove</button></span>
        </div>
      ))}
      <h2>Total: {total} ETB</h2>
      <Link className="button" href="/checkout">Pay</Link>
    </main>
  );
}
