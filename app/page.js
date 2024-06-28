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
    "digital content",
  ];
  const [index, setIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDashboardHovered, setIsDashboardHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
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
    const sections = document.querySelectorAll("[id^='section-']");
    const handleScroll = () => {
      let currentIndex = null;
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        if (rect.top > 0 && rect.top < window.innerHeight / 2) {
          currentIndex = index;
        }
      });
      setHoveredIndex(currentIndex);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="flex flex-col items-center justify-between min-h-screen main left-0">
      <div class="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-[radial-gradient(#ffffff33_1px,#00091d_1px)] bg-[size:20px_20px]"></div>
      <nav className="w-full flex justify-center fixed top-0">
        <div className="max-w-[1300px] flex justify-between w-full gap-5 p-2 px-7">
          <div className="flex items-center">
            <Image
              src="/CourseSurge-white.png"
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
                  className="text-white text-lg rounded-full border-2 p-3 font-semibold whitespace-nowrap h-11 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-110 hover:text-[#FFB100]"
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
                  className=" text-white font-semibold text-lg whitespace-nowrap w-48 m-2 h-11 flex bg-[#FFB100] text-lg text-[#664700] justify-center items-center rounded-full transition-all hover:scale-110 hover:text-[#453000]"
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
                  className="text-lg relative text-white rounded-full border-2 p-4 font-semibold whitespace-nowrap h-11 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-110 hover:text-[#FFB100]"
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
      <section className="flex flex-col items-center justify-center gap-4">
        <h1 className="top-72 relative z-20 font-extrabold lg:text-6xl text-4xl text-center lg:text-wrap flex flex-col gap-3 tracking-tight animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
          <span className="whitespace-nowrap">
            Top all-in-one solution for turning your
          </span>
          <span>
            <span>{typingText}</span>
            <span> into revenue </span>
          </span>
          <span className="mt-2.5">
            <span className="px-2 relative">
              <span className="absolute inset-0 bg-[#FFB100] -rotate-1"></span>
              <span className="isolate text-white"> within a few minutes</span>
            </span>
          </span>
        </h1>
        <h1 className="z-20 relative top-80 lg:whitespace-nowrap lg:text-lg text-base font-bold mt-2 tracking-tight">
          <span className="flex flex-col gap-1 text-center text-white">
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
      <section className="relative top-96 flex flex-col gap-28">
        <section>
          {" "}
          <div className="max-w-[1100px] pb-12 z-40 flex flex-col justify-center">
            <h1 className="font-semibold justify-center lg:text-4xl text-2xl mt-28 mb-12 tracking-tight animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
              What's the platform all about?
            </h1>
            <p className="text-white text-2xl leading-tight">
              CourseSurge is the ultimate all-in-one solution for creators
              looking to{" "}
              <span className="font-bold underlined-element">
                monetize their digital content.
              </span>{" "}
              With its intuitive designer, you can quickly create professional
              courses and websites. Seamlessly manage your content and
              effortlessly convert your audience into paying subscribers.
            </p>
          </div>
        </section>
        <div className="border-b-2"></div>
        <section className="text-white w-full flex items-center justify-center">
          <div className="max-w-[900px] w-full flex flex-row justify-center items-center">
            <div className="flex flex-col items-start">
              <h3 className="flex flex-col">
                <span>Design stunning websites</span>
                <span>effortlessly</span>
              </h3>
              <div className="flex flex-row align-text-bottom leading-[2rem] mt-3">
                <div className="mr-3 rounded-lg h-12 w-12 bg-white flex items-center justify-center text-black">
                  1.
                </div>
                <div className="flex flex-col">
                  <h1
                    id="section-1"
                    className={`text-xl ${
                      hoveredIndex === 0 ? "font-bold" : ""
                    }`}
                  >
                    Ease of Use
                  </h1>
                  <p className="text-base w-80">
                    Webpages consist of sections in which you can add all sorts
                    of content such as videos, audios, text, images, quizzes. We
                    also provide seamless integration with Stripe payments,
                    subscriptions, analytics. Choose one our market-optimized
                    templates, then add your own content by customizing it with
                    our designer.
                  </p>
                </div>
                <div className="ml-8">
                  <Image
                    src={"/interface-preview.png"}
                    width={650}
                    height={650}
                  />
                </div>
              </div>
              <div className="flex flex-row align-text-bottom leading-[2rem] mt-3">
                <div className="mr-3 rounded-lg h-12 w-12 bg-white flex items-center justify-center text-black">
                  2.
                </div>
                <div className="flex flex-col">
                  <h1
                    id="section-2"
                    className={`text-xl ${
                      hoveredIndex === 1 ? "font-bold" : ""
                    }`}
                  >
                    Ease of Use
                  </h1>
                  <p className="text-base w-80">
                    Webpages consist of sections in which you can add all sorts
                    of content such as videos, audios, text, images, quizzes. We
                    also provide seamless integration with Stripe payments,
                    subscriptions, analytics. Choose one our market-optimized
                    templates, then add your own content by customizing it with
                    our designer.
                  </p>
                </div>
                <div className="ml-8">
                  <Image
                    src={"/interface-preview.png"}
                    width={650}
                    height={650}
                  />
                </div>
              </div>
              <div className="flex flex-row align-text-bottom leading-[2rem] mt-3">
                <div className="mr-3 rounded-lg h-12 w-12 bg-white flex items-center justify-center text-black">
                  3.
                </div>
                <div className="flex flex-col">
                  <h1
                    id="section-3"
                    className={`text-xl ${
                      hoveredIndex === 2 ? "font-bold" : ""
                    }`}
                  >
                    Ease of Use
                  </h1>
                  <p className="text-base w-80">
                    Webpages consist of sections in which you can add all sorts
                    of content such as videos, audios, text, images, quizzes. We
                    also provide seamless integration with Stripe payments,
                    subscriptions, analytics. Choose one our market-optimized
                    templates, then add your own content by customizing it with
                    our designer.
                  </p>
                </div>
                <div className="ml-8">
                  <Image
                    src={"/interface-preview.png"}
                    width={289}
                    height={244}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}
