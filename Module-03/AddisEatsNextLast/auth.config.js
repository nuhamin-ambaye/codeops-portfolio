/**
 * Auth.js configuration that is safe to import in middleware.
 * Keep Node-only password/database work in auth.js and lib/users.js.
 */
export default {
  pages: {
    signIn: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 8,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role || "customer";
        token.phone = user.phone || "";
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub;
        session.user.role = token.role || "customer";
        session.user.phone = token.phone || "";
      }
      return session;
    },
  },
};
