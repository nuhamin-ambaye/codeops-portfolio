"use client";

import { useActionState, useEffect } from "react";
import Link from "next/link";
import { placeOrder } from "../actions";
import { useCart } from "../providers";

export default function CheckoutForm() {
  const [state, formAction, pending] = useActionState(placeOrder, null);
  const { cart, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (state?.success) clearCart();
  }, [state, clearCart]);

  if (state?.success) {
    return (
      <section className="card checkout-result" aria-live="polite">
        <h2>Order placed successfully!</h2>
        <p>Your order reference{state.orderIds.length === 1 ? " is" : "s are"}: {state.orderIds.join(", ")}</p>
        <p>Order total: {state.total} ETB</p>
        <p className="muted">This learning project records a mock order; it does not process real payments.</p>
        <Link className="button" href="/orders/history">View order history</Link>
      </section>
    );
  }

  if (cart.length === 0) {
    return <section className="card"><p>Your cart is empty.</p><Link className="button" href="/menu">Browse the menu</Link></section>;
  }

  return (
    <form action={formAction} className="card checkout-form">
      <h2>Delivery details</h2>
      <p>Order total: <strong>{total} ETB</strong></p>
      <input type="hidden" name="cartItems" value={JSON.stringify(cart.map(({ id, quantity }) => ({ id, quantity })))} readOnly />

      <label htmlFor="name">Full name</label>
      <input id="name" name="name" minLength={2} required placeholder="Your full name" />
      {state?.fieldErrors?.name?.map((message) => <p className="field-error" key={message}>{message}</p>)}

      <label htmlFor="phone">Phone number</label>
      <input id="phone" name="phone" required placeholder="09XXXXXXXX or +2519XXXXXXXX" />
      {state?.fieldErrors?.phone?.map((message) => <p className="field-error" key={message}>{message}</p>)}

      <label htmlFor="notes">Order notes (optional)</label>
      <textarea id="notes" name="notes" maxLength={200} rows={3} placeholder="Delivery instructions or notes" />
      {state?.fieldErrors?.notes?.map((message) => <p className="field-error" key={message}>{message}</p>)}

      {state?.error && <p className="field-error" role="alert">{state.error}</p>}
      <button className="button" type="submit" disabled={pending}>
        {pending ? "Placing order…" : "Place order"}
      </button>
      <p className="muted">Demo only: no real payment will be taken.</p>
    </form>
  );
}
