"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import "@/styles/global.css";

const Register = () => {
  const [error, setError] = useState("");
  const router = useRouter();

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");

      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");

      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        header: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 400) {
        setError("This email is already registered");
      }

      if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (error) {
      setError("Error, try again");
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-24 w-full">
      <div className="bg-black p-8 rounded shadow-md w-96 flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center font-semibold mb-8 text-white">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus_text-black"
            placeholder="Email"
            required
          ></input>
          <input
            type="password"
            className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus_text-black"
            placeholder="Password"
            required
          ></input>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            Register
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link className="text-white mt-2 hover:underline" href={"/login"}>
          Login with an existing account.
        </Link>
      </div>
    </div>
  );
};

export default Register;
