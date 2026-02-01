import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { profilepic, username } = await req.json();

  await dbConnect();

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    {
      ...(profilepic && { profilepic }),
      ...(username && { username }),
    },
    { new: true },
  );

  return NextResponse.json({
    success: true,
    user: {
      username: updatedUser.username,
      profilepic: updatedUser.profilepic,
    },
  });
}
