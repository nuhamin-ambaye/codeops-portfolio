import Link from "next/link";

export const metadata = {
  title: "Ethiopian Food, Made Easy",
  description: "Discover Ethiopian food, choose your favourite dishes, and enjoy Addis Eats.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <p>Addis Eats</p>
        <h1>Discover. Choose. Enjoy.</h1>
        <p>Explore Ethiopian food in one simple place.</p>
        <Link className="button" href="/menu">Explore the menu</Link>
      </section>
    </main>
  );
}
