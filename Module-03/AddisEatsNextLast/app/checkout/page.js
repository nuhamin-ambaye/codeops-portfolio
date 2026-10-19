import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import CheckoutForm from "./CheckoutForm";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Checkout",
  description: "Confirm your Addis Eats delivery details.",
  robots: { index: false, follow: false },
};

export default async function CheckoutPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/checkout");
  return (
    <main className="page">
      <h1>Checkout</h1>
      <p>Confirm your details to place your mock order.</p>
      <CheckoutForm />
    </main>
  );
}
