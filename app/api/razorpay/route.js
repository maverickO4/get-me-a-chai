import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

export const POST = async (req) => {
    await dbConnect();
    let body = await req.formData();
    body = Object.fromEntries(body);

  //Check if razorpayOrderId is present on the server
  let p = await Payment.findOne({ oid: body.razorpay_order_id });
  if (!p) {
    return NextResponse.json(
      { success: false, message: "Order ID not found" },
      { status: 400 },
    );
  }

//fetch the secret of the user who is receiving the payment
let user = await User.findOne({ username: p.to_user });
const secret = user.razorpaysecret;

  //Verify the payment signature
  let xx = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret,
  );
  if (xx) {
    //Update the payment status to done
    const updatedPayment = await Payment.findOneAndUpdate(
      { oid: body.razorpay_order_id },
      { done: true },
      { new: true },
    );
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?payment=success`,
    );
  } else {
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 400 },
    );
  }
};
