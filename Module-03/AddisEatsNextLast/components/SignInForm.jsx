"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignInForm({ nextPath = "/" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    const formData = new FormData(event.currentTarget);
    try {
      const result = await signIn("credentials", {
        phone: String(formData.get("phone") || "").trim(),
        password: String(formData.get("password") || ""),
        redirect: false,
        redirectTo: nextPath,
      });
      if (!result || result.error) {
        setError("The phone number or password was not recognised.");
        return;
      }
      router.replace(result.url || nextPath);
      router.refresh();
    } catch {
      setError("Sign-in could not be completed. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="card auth-form" onSubmit={handleSubmit}>
      <label htmlFor="phone">Phone number</label>
      <input id="phone" name="phone" autoComplete="tel" placeholder="09XXXXXXXX" required />
      <label htmlFor="password">Password</label>
      <input id="password" name="password" type="password" autoComplete="current-password" required />
      {error && <p className="field-error" role="alert">{error}</p>}
      <button className="button" type="submit" disabled={pending}>{pending ? "Signing in…" : "Sign in"}</button>
      <p>New to Addis Eats? <Link href={`/signup?next=${encodeURIComponent(nextPath)}`}>Create an account</Link>.</p>
    </form>
  );
}
