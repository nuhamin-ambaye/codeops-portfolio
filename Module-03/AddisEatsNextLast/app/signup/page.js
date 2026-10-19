import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { safeNextPath } from "../../lib/redirects";
import SignUpForm from "../../components/SignUpForm";

export const metadata = {
  title: "Create an account",
  description: "Create an Addis Eats account to place and track orders.",
  robots: { index: false, follow: false },
};

export default async function SignUpPage({ searchParams }) {
  const params = await searchParams;
  const nextPath = safeNextPath(params?.next);
  const user = await getSession();
  if (user) redirect(nextPath);
  return <main className="page auth-page"><h1>Create your Addis Eats account</h1><p>Your phone number will be used to sign in.</p><SignUpForm nextPath={nextPath} /></main>;
}
