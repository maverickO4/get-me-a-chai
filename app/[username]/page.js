import React from "react";
import PaymentPage from "@/components/PaymentPage";
import { notFound } from "next/navigation";
import { dbConnect } from "@/lib/dbConnect";
import User from "@/models/User";

const Username = async ({ params }) => {
  const { username } = await params;
  //If the username does not exist, return 404
  const checkUser = async () => {
    await dbConnect();
    let u = await User.findOne({ username: username });
    if (!u) {
      return notFound();
    }
  };
  await checkUser();
  return (
    <>
      <PaymentPage username={username} />
    </>
  );
};

export default Username;
export async function generateMetadata({ params }) {
  const { username } = await params;
  return {
    title: `Support ${username} - GetMeAChai`,
    description: `Support ${username} on GetMeAChai by making a payment.`,
  };
}
