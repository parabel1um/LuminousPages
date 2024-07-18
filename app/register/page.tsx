"use client";
import React, { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import "@/styles/global.css";
import { signIn } from "next-auth/react";

const Register: React.FC = () => {
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = form[0] as HTMLInputElement;
    const email = form[1] as HTMLInputElement;
    const password = form[2] as HTMLInputElement;

    if (!name.value) {
      setError("Name is required");
      return;
    }

    if (!isValidEmail(email.value)) {
      setError("Email is invalid");
      return;
    }

    if (!password.value || password.value.length < 10) {
      setError("Password is invalid");
      return;
    }

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
          username: name.value,
          name: name.value,
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
      console.error(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-24 w-full">
      <div className="bg-white border-black border-4 p-16 yellow-shadow rounded-3xl w-[500px] flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center font-semibold mb-8 text-black">
          Register
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-3">
            <p className="text-sm mb-0.5">Name</p>
            <input
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus_text-black"
              placeholder=""
              required
            />
          </div>
          <div className="flex flex-col my-3">
            <p className="text-sm mb-0.5">Email</p>
            <input
              type="email"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400"
              placeholder=""
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <p className="text-sm mb-0.5">Password</p>
            <input
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus_text-black"
              placeholder="At least 10 characters"
              required
            />
          </div>
          <p className="text-red-600 text-[16px] mb-1">{error && error}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
          >
            Register
          </button>
          <button
            type="button"
            className="text-black text-lg bg-white border-2 border-black rounded w-full hover:bg-gray-300 py-2 mt-2 flex items-center justify-center gap-3 p-2"
            onClick={() => {
              signIn("google");
            }}
          >
            <Image
              src={"/google_logo_icon.png"}
              alt="Google icon"
              width={25}
              height={25}
            />
            Sign Up With Google
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="text-black mt-2 text-center hover:underline"
          href={"/login"}
        >
          Login with an existing account.
        </Link>
      </div>
    </div>
  );
};

export default Register;
