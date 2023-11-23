"use client";
import React from "react";
import { useRouter } from "next/navigation";

function Navbar() {
  const router = useRouter();
  return (
    <div className="bg-black text-white py-2 flex justify-between text-lg">
      <div className="flex gap-4 pl-4">
        <button
          onClick={() => router.push(`/`)}
          className="cursor-pointer hover:text-blue-200"
        >
          Home
        </button>
        <button
          onClick={() => router.push(`/dashboard`)}
          className="cursor-pointer hover:text-blue-200"
        >
          Dashboard
        </button>
        <button
          onClick={() => router.push(`/create`)}
          className="cursor-pointer hover:text-blue-200"
        >
          Create
        </button>
      </div>
      <div className="flex gap-4 pr-4">
        <div
          onClick={() => router.push(`/login`)}
          className="cursor-pointer hover:text-blue-200"
        >
          Login
        </div>
        <div
          onClick={() => router.push(`/register`)}
          className="cursor-pointer hover:text-blue-200"
        >
          Register
        </div>
      </div>
    </div>
  );
}

export default Navbar;
