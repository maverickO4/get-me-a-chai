"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

const Navbar = () => {
  const { data: session } = useSession();
  const [showdropdown, setshowdropdown] = useState(false);

  return (
    <nav className="bg-gray-900 shadow-lg shadow-white text-white flex justify-between px-4 items-center md:h-16 flex-col md:flex-row">
      <Link
        className="logo font-bold text-lg flex justify-center items-center"
        href={"/"}
      >
        <Image className="invertImg" src="/tea.gif" width={50} height={5} alt="logo" unoptimized={true}/>
        <span className="text-2xl md:text-base my-3 md:my-0">GetMeAChai</span>
      </Link>


      <div className="relative flex flex-col md:block gap-4">
        {session && (
          <>
            <button
              onClick={() => {
                setshowdropdown(!showdropdown);
              }}
              onBlur={() => {
                setTimeout(() => {
                  setshowdropdown(false);
                }, 1000);
              }}
              id="dropdownDefaultButton"
              data-dropdown-toggle="dropdown"
              className="inline-flex items-center justify-center text-white mx-4 bg-blue-700 box-border border border-transparent hover:bg-blue-500 shadow-xs font-medium leading-5 rounded-lg text-sm px-4 py-2.5 focus:outline-none"
              type="button"
            >
              Welcome {session.user.email}
              <svg
                className="w-4 h-4 ms-1.5 -me-0.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 9-7 7-7-7"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className={`z-10 ${
                showdropdown ? "" : "hidden"
              } absolute left-33 bg-gray-900 border border-default-medium rounded-lg shadow-lg w-44`}
            >
              <ul
                className="p-2 text-sm text-body font-medium"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Dashboard
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${session.user.name}`}
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Your Page
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => {
                      signOut();
                    }}
                    href="#"
                    className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                  >
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}

        {session && (
          <button
            className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 me-2 mb-2"
            onClick={() => {
              signOut();
            }}
          >
            Logout
          </button>
        )}

        {!session && (
          <Link href={"/login"}>
            <button className="text-white bg-linear-to-br from-purple-600 to-blue-500 hover:bg-linear-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-4 py-2.5 text-center leading-5 me-2 mb-2">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
