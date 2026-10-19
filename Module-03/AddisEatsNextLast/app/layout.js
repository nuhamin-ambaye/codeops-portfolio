import "./globals.css";
import Link from "next/link";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import { siteName, siteUrl } from "../lib/site";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata = {
  metadataBase: siteUrl,
  title: {
    default: "Addis Eats — Ethiopian Food, Made Easy",
    template: "%s | Addis Eats",
  },
  description: "Discover Ethiopian dishes, explore the Addis Eats menu, and track your mock orders.",
  applicationName: siteName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    siteName,
    title: "Addis Eats — Ethiopian Food, Made Easy",
    description: "Discover. Choose. Enjoy. Explore Ethiopian food with Addis Eats.",
    url: "/",
    images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Addis Eats — Ethiopian Food, Made Easy" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Addis Eats — Ethiopian Food, Made Easy",
    description: "Discover. Choose. Enjoy.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <header>
          <Link href="/" className="logo">add<span>i</span>s eats</Link>
          <nav aria-label="Main navigation">
            <Link href="/">Home</Link>
            <Link href="/menu">Menu</Link>
            <Link href="/cart">Cart</Link>
            <Link href="/about">About</Link>
            <Link href="/signin">Sign in</Link>
            <Link href="/account">Account</Link>
          </nav>
        </header>
        <Providers>{children}</Providers>
        <footer>Addis Eats · Discover. Choose. Enjoy.</footer>
      </body>
    </html>
  );
}
