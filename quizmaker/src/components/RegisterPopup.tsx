"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";
import { useRouter } from "next/navigation";

function RegisterPopup() {
  const [showPopup, setShowPopup] = useState(true);
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {},
  });
  const router = useRouter();

  function registerNow() {
    router.push("/api/auth/signin");
  }
  if (!showPopup || session) {
    return null;
  }

  return (
    <div className="">
      <div className="shadow-lg bg-blue-100 flex flex-col gap-8 rounded-lg p-6 w-2/3 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="text-center text-lg">
          Please become a Member for better experience!
        </div>
        <div className="text-center text-2xl">And it's absolutely free!</div>
        <div className="flex gap-4 px-2">
          <button
            onClick={registerNow}
            className="w-full text-white mt-2 bg-red-500 hover:bg-red-600 rounded-full py-1 text-xl shadow-md"
          >
            Register Now 🤗
          </button>
          <button
            onClick={() => setShowPopup(false)}
            className="w-full text-white mt-2 bg-purple-500 hover:bg-purple-600 rounded-full py-1 text-xl shadow-md"
          >
            Maybe Later 😒
          </button>
        </div>
      </div>
    </div>
  );
}

export default RegisterPopup;
