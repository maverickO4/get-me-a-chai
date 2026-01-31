import Razorpay from "razorpay";
import { NextResponse } from "next/server";
import { dbConnect } from "@/lib/dbConnect";
import Payment from "@/models/Payment";
import User from "@/models/User";

export const POST = async (req) => {
  await dbConnect();

  const { amount, to_user } = await req.json();

  const user = await User.findOne({ username: to_user });

  if (!user || !user.razorpaysecret) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const razorpay = new Razorpay({
    key_id: user.razorpayid,
    key_secret: user.razorpaysecret,
  });

  const order = await razorpay.orders.create({
    amount: amount * 100,
    currency: "INR",
  });

  await Payment.create({
    oid: order.id,
    amount,
    to_user,
    done: false,
  });

  return NextResponse.json({
    success: true,
    orderId: order.id,
  });
};
