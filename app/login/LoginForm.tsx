"use client";

import { useState, useRef, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import "@/styles/global.css";
import { useRouter } from "next/navigation";

export function SubmitButton({ pending }: { pending: boolean }) {
  return (
    <button
      className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 mb-3"
      type="submit"
      disabled={pending}
    >
      {pending ? "Logging in..." : "Log in"}
    </button>
  );
}

export default function LoginForm() {
  const { data: session } = useSession();

  const [formState, setFormState] = useState({
    message: "",
    errors: { email: "", password: "" },
    fieldValues: { email: "", password: "" },
  });
  const [pending, setPending] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (formState.message === "success") {
      formRef.current?.reset();
    }
  }, [formState]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);

    const formData = new FormData(formRef.current!);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    try {
      const result = await signIn("credentials", {
        email,
        password,
      });

      if (result?.error) {
        setFormState({
          message: result.error,
          errors: { email: "", password: result.error },
          fieldValues: { email, password },
        });
      } else {
        setFormState({
          message: "success",
          errors: { email: "", password: "" },
          fieldValues: { email, password },
        });

        window.location.href = "/dashboard";
      }
    } catch (error) {
      console.error("Error during form submission:", error);
      setFormState({
        message: "error",
        errors: { email: "", password: "An unexpected error occurred" },
        fieldValues: { email, password },
      });
    } finally {
      setPending(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen p-24 w-full">
      <form
        ref={formRef}
        className="bg-white border-black border-4 p-16 yellow-shadow rounded-3xl w-[500px] flex justify-center items-center flex-col"
        onSubmit={handleSubmit}
      >
        <h1 className="text-4xl text-center font-semibold mb-8 text-black">
          Login
        </h1>
        <div className="flex flex-col my-3">
          <p className="text-sm mb-0.5">Email</p>
          <input
            id="email"
            name="email"
            type="text"
            className={`w-full border text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 ${
              formState.errors.email ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="example@mail.com"
            defaultValue={formState.fieldValues.email}
          />
        </div>
        <div className="flex flex-col mt-2">
          <p className="text-sm mb-0.5">Password</p>
          <input
            id="password"
            name="password"
            type="password"
            className={`w-full border text-black rounded px-3 py-2 mb-4 focus:outline-none focus:border-blue-400 ${
              formState.errors.password ? "border-red-400" : "border-gray-300"
            }`}
            placeholder="At least 10 characters"
            defaultValue={formState.fieldValues.password}
          />
        </div>
        <SubmitButton pending={pending} />
        <button
          type="button"
          className="text-black text-lg bg-white border-2 border-black rounded w-full hover:bg-gray-300 py-2 mt-2 flex items-center justify-center gap-3 p-2"
          onClick={() => signIn("google")}
        >
          <Image
            src="/google_logo_icon.png"
            alt="Google icon"
            width={25}
            height={25}
          />
          Sign In With Google
        </button>
        <div className="text-center text-gray-500 mt-4">- OR -</div>
        <Link
          className="text-black mt-2 text-center hover:underline"
          href="/register"
        >
          Register here
        </Link>
      </form>
    </div>
  );
}
