// import prisma from "@/lib/prisma";
// import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth, { NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";

// import async from "../../../dashboard/page";
// import { signInEmailPassword } from "@/app/auth/actions/auth-actions";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma) as Adapter,

  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),

    // CredentialsProvider({
    //   name: "Credentials",
    //   credentials: {
    //     email: {
    //       label: "Correo electrónico",
    //       type: "email",
    //       placeholder: "usuario@example.com",
    //     },
    //     password: { label: "Contraseña", type: "password" },
    //   },

    //   async authorize(credentials, req) {
    //     //Add logic here to look up the user from the credentials supplied
    //     const user = await signInEmailPassword(
    //       credentials!.email,
    //       credentials!.password
    //     );

    //     if (user) {
    //       return user;
    //     } else {
    //       return null;
    //     }
    //   },
    // }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log({ user });

      return true; // return false to restrict sign in
    },

    // async jwt({ token, user, account, profile }) {
    //   const dbUser = await prisma.user.findUnique({
    //     where: { email: token.email! ?? "no-email" },
    //   });
    //   token.roles = dbUser?.roles ?? ["no-roles"];
    //   token.id = dbUser?.id ?? "no-uuid";

    //   return token;
    // },

    // async session({ session, token, user }) {
    //   if (session && session.user) {
    //     session.user.roles = token.roles;
    //     session.user.id = token.id;
    //   }

    //   return session;
    // },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
