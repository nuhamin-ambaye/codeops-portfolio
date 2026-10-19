import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import authConfig from "./auth.config";
import { findUserByPhone } from "./lib/users";
import { requireAuthSecret } from "./lib/env";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  secret: requireAuthSecret(),
  trustHost: true,
  providers: [
    Credentials({
      name: "Phone and password",
      credentials: {
        phone: { label: "Phone number", type: "tel" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const phone = String(credentials?.phone || "").trim();
        const password = String(credentials?.password || "");
        if (!phone || !password) return null;

        const user = await findUserByPhone(phone);
        if (!user || !user.passwordHash) return null;

        const passwordMatches = await compare(password, user.passwordHash);
        if (!passwordMatches) return null;

        return {
          id: user.id,
          name: user.name,
          phone: user.phone,
          role: user.role,
        };
      },
    }),
  ],
});
