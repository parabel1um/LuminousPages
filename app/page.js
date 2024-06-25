"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/global.css";

export default function Home() {
  const services = ["Telegram", "Discord", "WhatsApp"];
  const [index, setIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const typingSpeed = 100;
  const eraseSpeed = 60;
  const pauseTime = 2000;

  useEffect(() => {
    let timer;

    const typeAndErase = () => {
      const currentService = services[index];

      if (isTyping) {
        let currentIndex = 0;
        timer = setInterval(() => {
          if (currentIndex <= currentService.length) {
            setTypingText(currentService.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(timer);
            setTimeout(() => {
              setIsTyping(false);
            }, pauseTime);
          }
        }, typingSpeed);
      } else {
        let currentIndex = currentService.length;
        timer = setInterval(() => {
          if (currentIndex >= 0) {
            setTypingText(currentService.substring(0, currentIndex));
            currentIndex--;
          } else {
            clearInterval(timer);
            setIndex((prevIndex) => (prevIndex + 1) % services.length);
            setIsTyping(true);
          }
        }, eraseSpeed);
      }
    };

    typeAndErase();

    return () => clearInterval(timer);
  }, [index, isTyping]);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen main">
      <nav className="w-full bg-white shadow-md flex justify-center">
        <div className="max-w-[1200px] flex justify-between w-full gap-5 p-2 px-7">
          <div className="flex items-center">
            <Image
              src="/CourseSurge.png"
              width={220}
              height={49}
              alt="CourseSurge Logo"
            />
          </div>
          <div className="flex gap-5">
            <div className="flex items-center">
              <Link href="#features" className="nav-item">
                Features
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="#pricing" className="nav-item">
                Pricing
              </Link>
            </div>
            <div className="flex items-center">
              <Link href="#guide" className="nav-item">
                How it works
              </Link>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="flex items-center">
              <button
                href="/designer/login"
                className="rounded-full border-2 p-3 font-semibold whitespace-nowrap h-11 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-110 hover:text-[#FFB100]"
              >
                <svg
                  xmlns="http://www.w3.org/1999/xlink"
                  aria-hidden="true"
                  role="img"
                  class="icon"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="currentColor"
                    d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m4.735 6c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139z"
                  ></path>
                </svg>
                Login
              </button>
            </div>
            <div className="whitespace-nowrap w-44 m-2 h-11 flex bg-[#FFB100] text-lg text-[#664700] justify-center items-center rounded-full transition-all hover:scale-110 hover:text-[#453000]">
              <button href="pricing" className="font-semibold text-lg">
                Get CourseSurge
              </button>
            </div>
            <></>
          </div>
        </div>
      </nav>
      <section className="flex-grow flex flex-col items-center justify-center">
        <h1 className="font-bold lg:text-5xl text-3xl text-center lg:text-wrap flex flex-col gap-3">
          <span className="whitespace-nowrap">
            <span>Launch your </span>
            <span className="">
              <span>{typingText}</span>
            </span>
            <span> online courses</span>
          </span>
          <span>
            <span>in </span>
            <span className="px-2 relative">
              <span className="absolute inset-0 bg-[#FFB100] -rotate-1"></span>
              <span className="isolate text-white"> just minutes</span>
            </span>
          </span>
        </h1>
        <h3>
          CourseSurge lets you design a course with customizable templates{" "}
        </h3>
      </section>
    </main>
  );
}
