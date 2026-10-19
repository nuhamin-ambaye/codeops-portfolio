/** Prevent external and protocol-relative redirect targets. */
export function safeNextPath(value) {
  if (typeof value !== "string") return "/";
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return "/";
  return value;
}
