// import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github";
// import mongoose from "mongoose";
// import User from "@/models/User";
// import Payment from "@/models/Payment";
// import { dbConnect } from "@/lib/dbConnect";

// // export async function GET(request) {}
// // export async function HEAD(request) {}
// // export async function POST(request) {}

// export const authOptions = NextAuth({
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//     // ...add more providers here
//   ],
//   callbacks: {
//     async signIn({ user, account, profile, email, credentials }) {
//       if (account.provider == "github") {
//         await dbConnect(); // Ensure DB is connected
//         // Check if the user exists

//         //ChatGPT logic
//         const email = user.email ?? `${user.id}@github.com`;

//         const currentUser = await User.findOne({ email: email });
//         if (!currentUser) {
//           // If not, create a new user
//           const newUser = await User.create({
//             email: email,
//             username: email.split("@")[0],
//           });

//           // user.name = newUser.username;
//         }
//         // else {
//         //   user.name = currentUser.username;
//         // }
//         return true;
//       }
//     },
//     async session({ session, user, token }) {
//       const dbUser = await User.findOne({ email: session.user.email });

//       if (dbUser) {
//         session.user.name = dbUser.username;
//       }
//       return session;
//     },
//   },
// });
// export { authOptions as GET, authOptions as POST };

// // import NextAuth from "next-auth";
// // import GithubProvider from "next-auth/providers/github";
// // import User from "@/models/User";
// // import { dbConnect } from "@/lib/dbConnect";

// // const authOptions = {
// //   providers: [
// //     GithubProvider({
// //       clientId: process.env.GITHUB_ID,
// //       clientSecret: process.env.GITHUB_SECRET,
// //     }),
// //   ],
// //   callbacks: {
// //     async signIn({ user, account }) {
// //       if (account.provider === "github") {
// //         await dbConnect(); // ✅ connect ONCE, safely

// //         let currentUser = await User.findOne({ email: user.email });

// //         if (!currentUser) {
// //           currentUser = await User.create({
// //             email: user.email,
// //             username: user.email.split("@")[0],
// //           });
// //         }

// //         user.name = currentUser.username;
// //         return true;
// //       }
// //       return true;
// //     },
// //   },
// //   async session({ session, user, token }) {
// //     const dbUser = await User.findOne({ email: session.user.email });
// //     session.user.name = dbUser.username;
// //     return session;
// //   },
// // };

// // const handler = NextAuth(authOptions);

// // export { handler as GET, handler as POST };

// Production database connection below
import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import User from "@/models/User";
import { dbConnect } from "@/lib/dbConnect";

export const authOptions = NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],

  callbacks: {
    async signIn({ user, account }) {
      console.log("SIGNIN CALLBACK HIT", {
        provider: account?.provider,
        email: user?.email,
        image: user?.image,
      });
      if (account.provider === "github") {
        await dbConnect();

        const email = user.email ?? `${user.id}@github.com`;

        await User.findOneAndUpdate(
          { email },
          {
            email,
            username: user.name || email.split("@")[0],
            profilepic: user.image, // ✅ SAVE IMAGE
          },
          { upsert: true, new: true },
        );

        return true;
      }
      return true;
    },

    async session({ session }) {
      await dbConnect();

      const dbUser = await User.findOne({ email: session.user.email });

      if (dbUser) {
        session.user.name = dbUser.username;
        session.user.profilepic = dbUser.profilepic; // ✅ EXPOSE IMAGE
        session.user.id = dbUser._id.toString();
      }

      return session;
    },
  },
});

export { authOptions as GET, authOptions as POST };
