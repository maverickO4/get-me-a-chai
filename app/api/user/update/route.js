// import { NextResponse } from "next/server";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/authOptions";
// import { dbConnect } from "@/lib/dbConnect";
// import User from "@/models/User";

// export async function POST(req) {
//   const session = await getServerSession(authOptions);

//   if (!session) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { profilepic, username } = await req.json();

//   await dbConnect();

//   const updatedUser = await User.findOneAndUpdate(
//     { email: session.user.email },
//     {
//       ...(profilepic && { profilepic }),
//       ...(username && { username }),
//     },
//     { new: true },
//   );

//   return NextResponse.json({
//     success: true,
//     user: {
//       username: updatedUser.username,
//       profilepic: updatedUser.profilepic,
//     },
//   });
// }






import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  await dbConnect();

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      name: body.name,
      username: body.username,
      profilepic: body.profilepic,
      coverpic: body.coverpic,
      razorpayid: body.razorpayid,
      razorpaysecret: body.razorpaysecret,
    },
    { new: true }
  ).lean(); // 🔴 IMPORTANT

  if (!updatedUser) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({
    success: true,
    user: updatedUser,
  });
}
