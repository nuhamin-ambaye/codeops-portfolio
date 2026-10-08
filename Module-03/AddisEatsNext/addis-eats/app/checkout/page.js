import Link from "next/link";

export const dynamic = "force-dynamic";

export default function CheckoutPage() {
  return <main className="page"><h1>Checkout</h1><p>Checkout is rendered dynamically.</p><Link className="button" href="/">Back home</Link></main>;
}
