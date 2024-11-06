import prisma from "@/config/prisma";
import CredentialsProvider from "next-auth/providers/credentials";
import { SignInSchema } from "./auth-validation";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import { NextAuthOptions } from "next-auth";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "abc@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any): Promise<any> {
        const result = await SignInSchema.safeParseAsync(credentials);
        const user = await prisma.user.findUnique({
          where: { email: result.data!.email },
        });
        if (!user) {
          throw new Error("No user found with this email");
        }

        const passwordMatch = await bcrypt.compare(
          result.data!.password,
          user.password
        );

        if (!passwordMatch) {
          throw new Error("Password is incorrect");
        }

        return { id: user.id, email: user.email, username: user.username };
      },
    }),
  ],
  pages: {
    signIn: "/signin",
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as string;
        token.email = user.email;
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.email = token.email;
      session.user.username = token.username;
      return session;
    },
  },
} satisfies NextAuthOptions;
