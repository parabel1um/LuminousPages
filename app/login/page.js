"use client";
import Link from "next/link";
import Image from "next/image";
import "@/styles/global.css";
import { useRouter } from "next/navigation";
import { signIn, signOut, useSession } from "next-auth/react";
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

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Invalid email or password");
      if (res?.url) {
        router.replace("/dashboard");
      }
    } else {
      setError("");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-24 w-full">
      <div className="bg-black p-8 rounded shadow-md w-96 flex justify-center items-center flex-col">
        <h1 className="text-4xl text-center font-semibold mb-8 text-white">
          Login
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
            Sign In
          </button>
          <p className="text-red-600 text-[16px] mb-4">{error && error}</p>
        </form>
        <button
          className="text-black text-lg bg-white rounded w-full hover:bg-gray-300 py-2 mt-2 flex items-center justify-center gap-3 p-2"
          onClick={() => {
            signIn("google");
          }}
        >
          <Image
            src={"/google_logo_icon.png"}
            alt="Google icon"
            width={25}
            height={25}
          ></Image>
          Sign In With Google
        </button>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link className="text-white mt-2 hover:underline" href={"/register"}>
          Register here
        </Link>
      </div>
    </div>
  );
}
