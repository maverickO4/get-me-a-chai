// import { NextResponse } from "next/server";
// import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
// import Payment from "@/models/Payment";
// import { dbConnect } from "@/lib/dbConnect";

// export const POST = async (req) => {
//   await dbConnect();
//   let body = await req.formData();
//   body = Object.fromEntries(body);

//   //Check if razorpayOrderId is present on the server
//   let p = await Payment.findOne({ oid: body.razorpay_order_id });
//   if (!p) {
//     return NextResponse.json(
//       { success: false, message: "Order ID not found" },
//       { status: 400 },
//     );
//   }

//   //fetch the secret of the user who is receiving the payment
//   // let user = await User.findOne({ username: p.to_user });
//   // const secret = user.razorpaysecret;

//   //ChatGPT modification to use global secret if user secret is not present
//   const secret = process.env.RAZORPAY_KEY_SECRET;

//   //Verify the payment signature
//   let xx = validatePaymentVerification(
//     {
//       order_id: body.razorpay_order_id,
//       payment_id: body.razorpay_payment_id,
//     },
//     body.razorpay_signature,
//     secret,
//   );
//   if (xx) {
//     //Update the payment status to done
//     const updatedPayment = await Payment.findOneAndUpdate(
//       { oid: body.razorpay_order_id },
//       { done: true },
//       { new: true },
//     );
//     return NextResponse.redirect(
//       `${process.env.NEXTAUTH_URL}/${updatedPayment.to_user}?payment=success`,
//     );
//   } else {
//     return NextResponse.json(
//       { success: false, message: "Payment verification failed" },
//       { status: 400 },
//     );
//   }
// };

//ChatGPT modified code
import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/models/Payment";
import { dbConnect } from "@/lib/dbConnect";

export const POST = async (req) => {
  await dbConnect();

  // Read Razorpay form data
  const body = Object.fromEntries(await req.formData());

  // 1️⃣ Check order exists
  const payment = await Payment.findOne({
    oid: body.razorpay_order_id,
  });

  if (!payment) {
    return NextResponse.json(
      { success: false, message: "Order ID not found" },
      { status: 400 },
    );
  }

  // 2️⃣ Fetch Razorpay secret (GLOBAL, NOT USER)
  const secret = process.env.RAZORPAY_KEY_SECRET;

  if (!secret) {
    return NextResponse.json(
      { success: false, message: "Razorpay secret missing on server" },
      { status: 500 },
    );
  }

  // 3️⃣ Verify signature
  const isValid = validatePaymentVerification(
    {
      order_id: body.razorpay_order_id,
      payment_id: body.razorpay_payment_id,
    },
    body.razorpay_signature,
    secret,
  );

  if (!isValid) {
    return NextResponse.json(
      { success: false, message: "Payment verification failed" },
      { status: 400 },
    );
  }

  // 4️⃣ Mark payment as successful
  await Payment.findOneAndUpdate(
    { oid: body.razorpay_order_id },
    { done: true },
  );

  // 5️⃣ Redirect back to creator page
  return NextResponse.redirect(
    `${process.env.NEXTAUTH_URL}/${payment.to_user}?payment=success`,
  );
};
