import { redirect } from "next/navigation";
import { getSession } from "../../lib/session";
import { safeNextPath } from "../../lib/redirects";
import SignInForm from "../../components/SignInForm";

export const metadata = {
  title: "Sign in",
  description: "Sign in to manage your Addis Eats orders.",
  robots: { index: false, follow: false },
};

export default async function SignInPage({ searchParams }) {
  const params = await searchParams;
  const nextPath = safeNextPath(params?.next);
  const user = await getSession();
  if (user) redirect(nextPath);
  return <main className="page auth-page"><h1>Welcome back</h1><p>Sign in to continue with Addis Eats.</p><SignInForm nextPath={nextPath} /></main>;
}
