import NextAuth, { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { createGuest, getGuest } from "./data-service";

declare module "next-auth" {
  /**
   * Returned by `auth`, `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    guestId: number;
    // user: {
    // The user's postal address.
    //   address: string;

    // By default, TypeScript merges new interface properties and overwrites existing ones.
    // In this case, the default session user properties will be overwritten,
    // with the new ones defined above. To keep the default session user properties,
    // you need to add them back into the newly declared interface.

    // } & DefaultSession["user"];
  }
}

const config: NextAuthConfig = {
  providers: [Google],
  callbacks: {
    authorized({ auth, request }) {
      return !!auth?.user;
    },
    // This callback runs before the actual sign up process happens. This means that we can do all kinds of processing before the user is actually signed up.
    async signIn({ user }) {
      if (!user || !user.email) return false;

      try {
        const existingUser = await getGuest(user.email);

        if (!existingUser)
          await createGuest({ email: user.email, fullName: user.name });

        return true;
      } catch (err) {
        console.error(err);
        return false;
      }
    },
    // the session callback runs after the signIn callback
    async session({ session }) {
      const guest = await getGuest(session.user.email);

      const newSession = { ...session, guestId: guest?.id };

      return newSession;
    },
  },
  pages: { signIn: "/login" },
};

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth(config);
