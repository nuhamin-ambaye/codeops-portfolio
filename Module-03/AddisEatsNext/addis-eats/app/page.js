import Link from "next/link";

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
