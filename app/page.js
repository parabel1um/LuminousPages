"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Link from "next/link";
import "../styles/global.css";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const services = [
    "Telegram channel",
    "Discord server",
    "WhatsApp channel",
    "community",
  ];
  const [index, setIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDashboardHovered, setIsDashboardHovered] = useState(false);
  const typingSpeed = 50;
  const eraseSpeed = 30;
  const pauseTime = 2500;

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

  useEffect(() => {
    const handleScroll = () => {
      const secondSection = document.getElementById("second-section");
      const secondNavbar = document.getElementById("second-navbar");

      if (secondSection && secondNavbar) {
        const sectionTop = secondSection.getBoundingClientRect().top;
        if (sectionTop <= 90) {
          secondNavbar.classList.add("show");
          secondSection.classList.add("active");
        } else {
          secondNavbar.classList.remove("show");
          secondSection.classList.remove("active");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen main left-0">
      <div className="fixed bottom-0 h-full w-full bg-[radial-gradient(125%_125%_at_50%_10%,#fff_35%,#00b3ff_100%)]">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
      </div>
      <nav className="w-full flex justify-center fixed top-0">
        <div className="max-w-[1300px] flex justify-between w-full gap-5 p-2 px-7">
          <div className="flex items-center">
            <Image
              src="/CourseSurge-black.png"
              width={220}
              height={49}
              alt="CourseSurge Logo"
            />
          </div>
          <div className="flex gap-5">
            <div className="flex items-center">
              <Link href="#guide" className="nav-item">
                How it works
              </Link>
            </div>
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
              <Link href="#FAQ" className="nav-item">
                FAQ
              </Link>
            </div>
          </div>
          {!session ? (
            <div className="flex gap-3">
              <div className="flex items-center">
                <Link
                  href={"/login"}
                  className="text-lg rounded-full border-2 p-3 font-semibold whitespace-nowrap h-11 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-110 hover:text-[#FFB100]"
                >
                  <svg
                    xmlns="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon"
                    width="1.3em"
                    height="1.3em"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m4.735 6c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139z"
                    ></path>
                  </svg>{" "}
                  Login
                </Link>
                <Link
                  className="font-semibold text-lg whitespace-nowrap w-48 m-2 h-11 flex bg-[#FFB100] text-lg text-[#664700] justify-center items-center rounded-full transition-all hover:scale-110 hover:text-[#453000]"
                  href={"#pricing"}
                >
                  Get CourseSurge
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex items-center">
                <Link
                  href={"/login"}
                  className="text-lg relative rounded-full border-2 p-4 font-semibold whitespace-nowrap h-11 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-110 hover:text-[#FFB100]"
                  onMouseEnter={() => setIsDashboardHovered(true)}
                  onMouseLeave={() => setIsDashboardHovered(false)}
                >
                  <Image
                    src={
                      isDashboardHovered ? "/dashboard2.png" : "/dashboard.png"
                    }
                    alt="Dashboard"
                    className=""
                    width={25}
                    height={25}
                  />
                  <p>Dashboard</p>
                </Link>
                <Link
                  className="font-semibold whitespace-nowrap w-28 m-2 h-11 flex bg-[#bd1515] text-lg text-white justify-center items-center rounded-full transition-all hover:scale-110 hover:bg-[#750000]"
                  onClick={() => signOut()}
                  href={"/"}
                >
                  Logout
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      <nav
        id="second-navbar"
        className="w-full bg-white flex justify-center fixed top-0 z-20 h-20"
      >
        <div className="max-w-[1300px] flex justify-between w-full gap-5 p-2 px-7">
          <div className="flex items-center">
            <Image
              src="/CourseSurge-black.png"
              width={220}
              height={49}
              alt="CourseSurge Logo"
            />
          </div>
          <div className="flex gap-5">
            <div className="flex items-center">
              <Link href="#guide" className="nav-item">
                How it works
              </Link>
            </div>
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
              <Link href="#FAQ" className="nav-item">
                FAQ
              </Link>
            </div>
          </div>
          <div className="flex gap-3">
            {!session ? (
              <div className="flex items-center">
                <Link
                  href={"/login"}
                  className="rounded-full bg-black text-white border-2 p-3 text-lg font-semibold whitespace-nowrap h-11 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-110 hover:text-[#FFB100]"
                >
                  <svg
                    xmlns="http://www.w3.org/1999/xlink"
                    aria-hidden="true"
                    role="img"
                    className="icon"
                    width="1.3em"
                    height="1.3em"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="currentColor"
                      d="M8 8a3 3 0 1 0 0-6a3 3 0 0 0 0 6m4.735 6c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139z"
                    ></path>
                  </svg>{" "}
                  Login
                </Link>
                <Link
                  className="font-semibold text-lg whitespace-nowrap w-48 m-2 h-11 flex bg-[#FFB100] text-lg text-[#664700] justify-center items-center rounded-full transition-all hover:scale-110 hover:text-[#453000]"
                  href={"#pricing"}
                >
                  Get CourseSurge
                </Link>
              </div>
            ) : (
              <div className="flex gap-3">
                <div className="flex items-center">
                  <Link
                    href={"/login"}
                    className="text-lg relative rounded-full border-2 p-4 font-semibold whitespace-nowrap h-11 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-110 hover:text-[#FFB100]"
                    onMouseEnter={() => setIsDashboardHovered(true)}
                    onMouseLeave={() => setIsDashboardHovered(false)}
                  >
                    <Image
                      src={
                        isDashboardHovered
                          ? "/dashboard2.png"
                          : "/dashboard.png"
                      }
                      alt="Dashboard"
                      className=""
                      width={25}
                      height={25}
                    />
                    <p>Dashboard</p>
                  </Link>
                  <Link
                    className="font-semibold whitespace-nowrap w-28 m-2 h-11 flex bg-[#bd1515] text-lg text-white justify-center items-center rounded-full transition-all hover:scale-110 hover:bg-[#750000]"
                    href={""}
                  >
                    Logout
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </nav>

      <section className="fixed flex-grow flex flex-col items-center justify-center gap-4 bottom-80 top-36">
        <h1 className="font-extrabold lg:text-6xl text-4xl text-center lg:text-wrap flex flex-col gap-3 tracking-tight">
          <span className="whitespace-nowrap">
            Top all-in-one solution for turning your
          </span>
          <span className="">
            <span>{typingText}</span>
            <span> into revenue </span>
          </span>
          <span className="mt-2.5">
            <span className="px-2 relative">
              <span className="absolute inset-0 bg-[#FFB100] -rotate-1"></span>
              <span className="isolate"> within a few minutes</span>
            </span>
          </span>
        </h1>
        <h1 className="lg:whitespace-nowrap lg:text-lg text-base font-bold mt-2 tracking-tight">
          <span className="flex flex-col gap-1 text-center">
            <span>
              The <span className="underlined-element">ultimate</span> tool for
              creating <span className="underlined-element">courses</span>,{" "}
              <span className="underlined-element">websites</span>, or{" "}
              <span className="underlined-element">paid-access platforms</span>
            </span>
            <span>
              <span className="font-extrabold text-xl underlined-element">
                with ease.
              </span>
            </span>
          </span>
        </h1>
      </section>
      <section
        id="second-section"
        className="absolute top-3/4 bg-white w-full pb-96 rounded-t-[80px] flex justify-center h-full"
      >
        <div className="">
          <h1 className="font-semibold text-xl mt-8 mb-3">
            What's this all about?
          </h1>
        </div>
        <div className="max-w-[1100px] flex flex-col w-full justify-start">
          <h1 className="font-semibold text-2xl mt-8 mb-3">
            What makes us better than competitors?
          </h1>
          <div className="flex items-center justify-start">
            <div className="flex flex-col p-4 pt-1 w-3/4">
              <Image
                src={"/interface-preview.png"}
                alt="interface preview"
                width={280}
                height={200}
                className="ml-6 m-2"
              />
            </div>
            <div className="h-full border-black">
              <h1 className="ml-6 mt-0.5 lg:text-lg tracking-tight leading-5 flex flex-col">
                <span className="text-4xl font-bold align-top mb-3">
                  <span className="font-bold text-5xl align-middle">1. </span>
                  Easy to use page builder
                </span>
                <span>
                  Create your own unique pages effortlessly using our builder
                  with customizable sections. Whether you need progress bars,
                  videos, or other types of content, we've got you covered.
                </span>
              </h1>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
