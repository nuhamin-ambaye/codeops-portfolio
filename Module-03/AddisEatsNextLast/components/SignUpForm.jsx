"use client";

import { useState } from "react";
import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignUpForm({ nextPath = "/" }) {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setPending(true);
    const formData = new FormData(event.currentTarget);
    const details = {
      name: String(formData.get("name") || "").trim(),
      phone: String(formData.get("phone") || "").trim(),
      password: String(formData.get("password") || ""),
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(details),
      });
      const result = await response.json();
      if (!response.ok) {
        setError(result.error || "Could not create your account.");
        return;
      }

      const signInResult = await signIn("credentials", {
        phone: details.phone,
        password: details.password,
        redirect: false,
        redirectTo: nextPath,
      });
      if (!signInResult || signInResult.error) {
        setError("Your account was created, but automatic sign-in failed. Please sign in.");
        return;
      }
      router.replace(signInResult.url || nextPath);
      router.refresh();
    } catch {
      setError("Registration could not be completed. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <form className="card auth-form" onSubmit={handleSubmit}>
      <label htmlFor="name">Full name</label>
      <input id="name" name="name" autoComplete="name" minLength={2} maxLength={80} required />
      <label htmlFor="phone">Phone number</label>
      <input id="phone" name="phone" autoComplete="tel" placeholder="09XXXXXXXX or +2519XXXXXXXX" required />
      <label htmlFor="password">Password (at least 8 characters)</label>
      <input id="password" name="password" type="password" autoComplete="new-password" minLength={8} maxLength={128} required />
      {error && <p className="field-error" role="alert">{error}</p>}
      <button className="button" type="submit" disabled={pending}>{pending ? "Creating account…" : "Create account"}</button>
      <p>Already have an account? <Link href={`/signin?next=${encodeURIComponent(nextPath)}`}>Sign in</Link>.</p>
      <p className="muted">Demo limitation: accounts are held in memory and are cleared when the server process restarts.</p>
    </form>
  );
}
