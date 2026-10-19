import Link from "next/link";
import { redirect } from "next/navigation";
import SignOutButton from "../../components/SignOutButton";
import { getSession } from "../../lib/session";

export const dynamic = "force-dynamic";
export const metadata = {
  title: "Your account",
  description: "View your Addis Eats account and account options.",
  robots: { index: false, follow: false },
};

export default async function AccountPage() {
  const user = await getSession();
  if (!user) redirect("/signin?next=/account");
  return (
    <main className="page">
      <h1>Your account</h1>
      <section className="card auth-form">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>Phone:</strong> {user.phone}</p>
        <p><strong>Role:</strong> {user.role}</p>
        <Link href="/orders/history">View my orders</Link>
        {user.role === "staff" && <Link href="/kitchen">Open kitchen queue</Link>}
        <SignOutButton />
      </section>
    </main>
  );
}
