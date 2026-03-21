import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import NaverProvider from "next-auth/providers/naver";
import KakaoProvider from "next-auth/providers/kakao";
import type { NextAuthOptions } from "next-auth";
import CGCUser from "@/models/CgcUser";
import { comparePassword } from "@/lib/password/password";

const providers: NextAuthOptions["providers"] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      id: { label: "ID", type: "text" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentails) {
      if (credentails) {
        const cgcUser = await CGCUser.findOne({ id: credentails.id });
        if (cgcUser && (await comparePassword(credentails.password, cgcUser.password))) {
          return {
            id: cgcUser.id,
            name: cgcUser.name,
            email: cgcUser.email,
            role: cgcUser.role,
          };
        }
      }
      return null;
    },
  }),
];

if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  providers.push(
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    })
  );
}

if (process.env.NAVER_CLIENT_ID && process.env.NAVER_CLIENT_SECRET) {
  providers.push(
    NaverProvider({
      clientId: process.env.NAVER_CLIENT_ID,
      clientSecret: process.env.NAVER_CLIENT_SECRET,
    })
  );
}

if (process.env.KAKAO_CLIENT_ID && process.env.KAKAO_CLIENT_SECRET) {
  providers.push(
    KakaoProvider({
      clientId: process.env.KAKAO_CLIENT_ID,
      clientSecret: process.env.KAKAO_CLIENT_SECRET,
    })
  );
}

const authOptions: NextAuthOptions = {
  providers,
  pages: {
    signIn: "/signin",
  },
  callbacks: {
    async redirect({ baseUrl }) {
      return baseUrl;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 60,
    updateAge: 5 * 60,
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
