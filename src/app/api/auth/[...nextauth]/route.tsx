import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const authOptions :NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name: 'Credentials',
            credentials : {
                email: { label: "ID", type: "text"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentails, req) {
                if (credentails?.email === "admin" && credentails?.password === "cgc2025!@#$") {
                    return { id: "1", name : "관리자", email : "admin"};
                }
                return null;
            }
        })
    ],
    callbacks : {
        async redirect({url,baseUrl}) {
            return baseUrl;
        }
    },
    session: {
        strategy: "jwt",
        maxAge: 30 * 60,
        updateAge: 5 * 60,
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
