import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import CGCUser from "@/models/CgcUser";
import { comparePassword } from "@/lib/password/password";

const authOptions :NextAuthOptions = {
    providers : [
        CredentialsProvider({
            name: 'Credentials',
            credentials : {
                id: { label: "ID", type: "text"},
                password: { label: "Password", type: "password"},
            },
            async authorize(credentails, req) {

                if (credentails) {
                    const cgcUser = await CGCUser.findOne({ id : credentails.id});
                    if (cgcUser && await comparePassword(credentails.password, cgcUser.password)) {
                        return {
                            id : cgcUser.id,
                            name : cgcUser.name,
                            email : cgcUser.email,
                            role : cgcUser.role
                        }
                    }
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
