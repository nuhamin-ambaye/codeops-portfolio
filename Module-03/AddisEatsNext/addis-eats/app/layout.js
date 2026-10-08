import "./globals.css";
import Link from "next/link";
import { Providers } from "./providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <Link href="/" className="logo">add<span>i</span>s eats</Link>
          <nav>
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/about">About</Link>
          </nav>
        </header>
        <Providers>{children}</Providers>
        <footer>Addis Eats · Discover. Choose. Enjoy.</footer>
      </body>
    </html>
  );
}
