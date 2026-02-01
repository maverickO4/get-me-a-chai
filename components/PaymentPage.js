"use client";
import React, { use, useEffect, useState } from "react";
import Script from "next/script";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { fetchuser, fetchpayments, initiate } from "@/actions/useractions";
import { ToastContainer, toast, Bounce } from "react-toastify";
import { useSearchParams, useRouter } from "next/navigation";
import Dashboard from "./Dashboard";

const PaymentPage = ({ username }) => {
  const { data: session, status } = useSession();
  const [paymentform, setpaymentform] = useState({
    name: "",
    message: "",
    amount: "",
  });
  // const [paymentform, setpaymentform] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [payments, setPayments] = useState([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const getData = async (params) => {
    let u = await fetchuser(username);
    if (!u) {
      return <div>User not found</div>;
    }
    setCurrentUser(u);
    let dbpayments = await fetchpayments(username);
    setPayments(dbpayments);
  };

  useEffect(() => {
    if (username) getData();
  }, []);

  useEffect(() => {
    const paymentDone = searchParams.get("payment");
    if (paymentDone === "success") {
      toast.success("Payment Successful!", {
        position: "top-right",
        autoClose: 3000,
        transition: Bounce,
      });
      router.push(`/${username}`);
    }
  }, [router, searchParams, username]);

  const handleChange = (e) => {
    setpaymentform({ ...paymentform, [e.target.name]: e.target.value });
  };

  // const pay = async (amount) => {
  //   if (!paymentform.name) {
  //     alert("Please enter your name");
  //     return;
  //   }
  //   //Optional login check
  //   if (status !== "authenticated") {
  //     alert("Please login to continue");
  //     return;
  //   }

  //   let a = await initiate(amount, username, paymentform);
  //   let orderId = a.id;
  //   //ChatGPT modified to get id from a
  //   // if (a?.statusCode) {
  //   //   alert(a.error);
  //   //   return;
  //   // }
  //   // const orderId = a.id;

  //   var options = {
  //     key: currentUser.razorpayid, // Enter the Key ID generated from the Dashboard
  //     amount: amount, // Amount is in currency subunits.
  //     currency: "INR",
  //     name: "Get Me A Chai", //your business name
  //     description: "Test Transaction",
  //     image: "https://example.com/your_logo",
  //     order_id: orderId, // This is a sample Order ID. Pass the `id` obtained in the response of Step 1
  //     callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
  //     prefill: {
  //       //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
  //       name: "Gaurav Kumar", //your customer's name
  //       email: "gaurav.kumar@example.com",
  //       contact: "+919876543210", //Provide the customer's phone number for better conversion rates
  //     },
  //     notes: {
  //       address: "Razorpay Corporate Office",
  //     },
  //     theme: {
  //       color: "#3399cc",
  //     },
  //   };
  //   var rzp1 = new Razorpay(options);
  //   rzp1.open();

  // };

  
  const pay = async (amount) => {
  // 1️⃣ Create order on server
  const res = await fetch("/api/create-order", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      amount,
      to_user: username,
    }),
  });

  const data = await res.json();

  if (!data.success) {
    alert("Failed to create order");
    return;
  }

  const { orderId } = data;

  // 2️⃣ Open Razorpay checkout
  const options = {
    key: currentUser.razorpayid,
    amount: amount * 100,
    currency: "INR",
    name: "Get Me A Chai",
    description: "Support Creator",
    order_id: orderId,

    callback_url: `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,

    prefill: {
      name: session.user.name,
      email: session.user.email,
    },

    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new Razorpay(options);
  rzp.open();
};

  return (
    <>
      <Script src="https://checkout.razorpay.com/v1/checkout.js" />

      <div className="bg-[#121215] flex flex-col">
        <div className="cover w-full relative">
          <Image
            className="object-cover w-full"
            // src={`${currentUser.coverpic}`}
            src={`${currentUser?.coverpic || "/cover.jpg"}`}
            // src={profileImage}
            alt="cover"
            width={100}
            height={50}
            unoptimized={true}
          />
          <div className="absolute -bottom-20 right-[33%] md:right-[46%] border-4 border-white rounded-full size-36 overflow-hidden">
            <Image
              className="rounded-full object-cover size-36"
              width={150}
              height={150}
              // src={`${currentUser.profilepic}`}
              src={`${currentUser?.profilepic || "/avatar.gif"}`}
              alt="profile pic"
              unoptimized={true}
            />
          </div>
        </div>
        <div className="info flex flex-col justify-center items-center my-24 mb-32 gap-2">
          <div className="font-bold text-lg">@{username}</div>
          <div className="font-semibold">Lets help {username} get a chai!</div>
          <div className="">
            {payments.length} Payments. ₹
            {payments.reduce((acc, payment) => acc + payment.amount, 0)}{" "}
            raised...
          </div>
          <div className="payment flex gap-3 w-[80%] mt-11 flex-col md:flex-row">
            <div className="supporters w-full md:w-1/2 bg-gray-900 rounded-lg p-10">
              {/* Show list of all the supporters as a leaderboard */}
              <h2 className="text-2xl font-bold my-5">Top 10 Supporters</h2>
              <ul className="mx-5 text-lg">
                {payments.length === 0 && (
                  <p>No supporters yet. Be the first one to support!</p>
                )}
                {payments.map((p, i) => {
                  return (
                    <li key={i} className="my-4 flex gap-2 items-center">
                      <Image
                        src="/avatar.gif"
                        alt="user"
                        width={35}
                        height={63}
                        unoptimized={true}
                      />
                      <span>
                        {p.name} donated{" "}
                        <span className="font-bold">₹{p.amount}</span> with a
                        message &quot;{p.message}&quot;
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="makePayment w-full md:w-1/2 bg-gray-900 rounded-lg p-10">
              <h2 className="text-2xl font-bold my-5">Make a Payment</h2>
              <div className="flex flex-col md:flex-row gap-2">
                <input
                  onChange={handleChange}
                  value={paymentform.name}
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Your name"
                  name="name"
                  id=""
                />
                <input
                  onChange={handleChange}
                  value={paymentform.message}
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Your message"
                  name="message"
                  id=""
                />
                <input
                  onChange={handleChange}
                  value={paymentform.amount}
                  type="text"
                  className="w-full p-3 rounded-lg bg-slate-800"
                  placeholder="Enter Amount"
                  name="amount"
                  id=""
                />
              </div>
              {/* Or choose from these amounts */}
              <div className="flex flex-col md:flex-row gap-2 mt-5">
                <button
                  className="hover:cursor-pointer bg-slate-800 p-3 rounded-lg"
                  onClick={() => {
                    pay(1000);
                  }}
                >
                  Pay ₹10
                </button>
                <button
                  className="hover:cursor-pointer bg-slate-800 p-3 rounded-lg"
                  onClick={() => {
                    pay(2000);
                  }}
                >
                  Pay ₹20
                </button>
                <button
                  className="hover:cursor-pointer bg-slate-800 p-3 rounded-lg"
                  onClick={() => {
                    pay(3000);
                  }}
                >
                  Pay ₹30
                </button>
              </div>
              <div className="pay-button">
                <button
                  onClick={() => {
                    pay(Number.parseInt(paymentform.amount) * 100);
                  }}
                  className="hover:cursor-pointer text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-bold rounded-lg w-full py-3 my-8 me-2 mb-2 disabled:opacity-50"
                  disabled={
                    paymentform.name?.length < 3 ||
                    paymentform.message?.length < 4 ||
                    paymentform.amount?.length < 1
                  }
                >
                  Pay
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
