import { auth } from "../auth";

/** One shared session helper for Server Components, actions, and handlers. */
export async function getSession() {
  const session = await auth();
  return session?.user || null;
}
