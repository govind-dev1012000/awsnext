import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials"
import Cookies from 'js-cookie'
export default NextAuth({
    providers: [
        // GitHubProvider({
        //     clientId: 'e4707c6ccf427c61fc4e',
        //     clientSecret: '756ec9565fa475066313e3eb5c2820218499beac'
        // }),

        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                identifier: { label: "Username", type: "text", placeholder: "jsmith" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const res = await fetch("http://13.127.243.26/api/auth/local", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()
                console.log(user);
                console.log(user.jwt);
                Cookies.set('routing', JSON.stringify())
                // Cookies.set('auth',user.jwt);
                // localStorage.setItem("auth",user.jwt
                // If no error and we have user data, return it
                if (res.ok && user) {
                    
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],
    callbacks: {
        jwt: async ({ token, user }) => {
            user && (token = user)
            return token
        },
        session: async ({ session, token }) => {
            session.jwt = token.jwt
            return session
        }
    },
    secret: process.env.NEXTAUTH_SECRET,
    
    // jwt: {
    //     encryption: false
    //   },
    // callbacks: {
    //     async jwt({token}) {
    //       return token
    //     }
    // }
    // callbacks: {
    //     async jwt({ token, user }) {
    //       if (user) {
    //         return {
    //           accessToken: user.jwt,
    //         };
    //       }
    //       console.log(token)
    //       return token;
    //     },

    //     async session({ session, token }) {
    //       session.user.accessToken = token.accessToken;
    //       console.log(session)
    //       return session;
    //     },
    //   },
})