import NextAuth from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "./auth.config";

const { auth } = NextAuth(authConfig);

export default auth((request) => {
  const { pathname } = request.nextUrl;
  const user = request.auth?.user;

  const isKitchen = pathname.startsWith("/kitchen");
  const isProtected =
    pathname.startsWith("/checkout") ||
    pathname.startsWith("/orders") ||
    isKitchen;

  if (isProtected && !user) {
    const signInUrl = new URL("/signin", request.url);
    signInUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(signInUrl);
  }

  if (isKitchen && user?.role !== "staff") {
    return NextResponse.redirect(new URL("/not-authorized", request.url));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*", "/kitchen/:path*"],
};
