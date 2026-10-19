import Link from "next/link";

export const metadata = {
  title: "Not authorised",
  description: "You do not have permission to open this Addis Eats page.",
  robots: { index: false, follow: false },
};

export default function NotAuthorizedPage() {
  return <main className="page"><h1>Access denied</h1><p>This area is only available to Addis Eats staff.</p><Link className="button" href="/">Return home</Link></main>;
}
