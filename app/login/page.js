"use client";
import Link from "next/link";
import Image from "next/image";
import "@/styles/global.css";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Login() {
  const session = useSession();
  const router = useRouter();
  const [error, setError] = useState("");

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.replace("/dashboard");
    }
  }, [session, router]);

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password is invalid");
      return;
    }

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res.error) {
      setError(res.error);
    } else {
      setError("");
      if (res.status === 200) {
        window.location.href = "/dashboard";
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-24 w-full">
      <div className="bg-white border-black border-4 p-16 yellow-shadow rounded-3xl w-[500px] flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center font-semibold mb-8 text-black">
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col my-3">
            <p className="text-sm mb-0.5">Email</p>
            <input
              name="email"
              type="text"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400"
              placeholder=""
              required
            />
          </div>
          <div className="flex flex-col mt-2">
            <p className="text-sm mb-0.5">Password</p>
            <input
              name="password"
              type="password"
              className="w-full border border-gray-300 text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 focus_text-black"
              placeholder="At least 8 characters"
              required
            />
          </div>
          <p className="text-red-600 text-[16px] mb-1">{error && error}</p>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
          >
            Sign In
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
            Sign In With Google
          </button>
        </form>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="text-black mt-2 text-center hover:underline"
          href={"/register"}
        >
          Register here
        </Link>
      </div>
    </div>
  );
}
