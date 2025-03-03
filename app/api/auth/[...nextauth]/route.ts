import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// ✅ Define the authentication configuration
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

// ✅ Export API route handlers for Next.js App Router
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
