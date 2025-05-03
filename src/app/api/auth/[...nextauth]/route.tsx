import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";

const authOptions :NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name: 'Credentials',
            credentials : {
                email: { label: "Email", type: "text"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentails, req) {
                if (credentails?.email === "admin@test.com" && credentails?.password === "1234") {
                    return { id: "1", name : "관리자", email : "admin@test.com"};
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
    }
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
