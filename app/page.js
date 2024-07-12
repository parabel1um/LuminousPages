"use client";
import Image from "next/image";
import { useEffect, useState, useRouter } from "react";
import Link from "next/link";
import "../styles/global.css";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  const services = [
    { name: "community", style: "yellow-green-gradient" },
    { name: "Telegram channel", style: "telegram-gradient" },
    { name: "Discord server", style: "discord-gradient" },
    { name: "Instagram page", style: "instagram-gradient" },
    { name: "TikTok page", style: "tiktok-gradient" },
    { name: "WhatsApp channel", style: "whatsapp-gradient" },
    { name: "digital content", style: "cyan-purple-gradient" },
  ];
  const [index, setIndex] = useState(0);
  const [typingText, setTypingText] = useState("");
  const [textStyle, setTextStyle] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [isDashboardHovered, setIsDashboardHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [monthly, setMonthly] = useState(true);
  const typingSpeed = 50;
  const eraseSpeed = 30;
  const pauseTime = 2500;
  const text = "Top all-in-one w for turning your t into revenue";
  const words = text.split(" ");

  useEffect(() => {
    let timer;

    const typeAndErase = () => {
      const currentService = services[index];
      setTextStyle(
        `${currentService.style} underline underline-offset-8 decoration-[#FFB100] decoration-dashed decoration-[3.5px]`
      );

      if (isTyping) {
        let currentIndex = 0;
        timer = setInterval(() => {
          if (currentIndex <= currentService.name.length) {
            setTypingText(currentService.name.substring(0, currentIndex));
            currentIndex++;
          } else {
            clearInterval(timer);
            setTimeout(() => setIsTyping(false), pauseTime);
          }
        }, typingSpeed);
      } else {
        let currentIndex = currentService.name.length;
        timer = setInterval(() => {
          if (currentIndex >= 0) {
            setTypingText(currentService.name.substring(0, currentIndex));
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
        const top = rect.top; // distance from top of container to top of viewport
        const height = rect.height;
        const windowHeight = window.innerHeight;

        let multiplierScreen;
        let multiplierArea;
        if (windowHeight > 2500) {
          multiplierScreen = 1.0;
          multiplierArea = 0.5;
        } else if (windowHeight > 2200) {
          multiplierScreen = 1.1;
          multiplierArea = 0.55;
        } else if (windowHeight > 2000) {
          multiplierScreen = 1.2;
          multiplierArea = 0.6;
        } else if (windowHeight > 1800) {
          multiplierScreen = 1.3;
          multiplierArea = 0.65;
        } else if (windowHeight > 1600) {
          multiplierScreen = 1.4;
          multiplierArea = 0.7;
        } else if (windowHeight > 1440) {
          multiplierScreen = 1.6;
          multiplierArea = 0.75;
        } else if (windowHeight > 1280) {
          multiplierScreen = 1.8;
          multiplierArea = 0.8;
        } else if (windowHeight > 1080) {
          multiplierScreen = 2.0;
          multiplierArea = 0.85;
        } else if (windowHeight > 900) {
          multiplierScreen = 2.3;
          multiplierArea = 0.9;
        } else {
          multiplierScreen = 2.6;
          multiplierArea = 0.95;
        }

        if (top > 0 && top < window.innerHeight * multiplierArea) {
          currentIndex = index;
          const scrollPercentage = Math.min(
            100,
            Math.max(
              0,
              (((windowHeight - top) * multiplierScreen) /
                (windowHeight + height)) *
                100
            ) // added margin
          );

          if (index === 0 || index === 1) {
            const scrollIndicator = document.querySelector(
              `.scroll-indicator-${index + 1}`
            );

            if (scrollIndicator) {
              scrollIndicator.style.height = scrollPercentage + "%";
            }
          }
        } else {
          const scrollIndicator = document.querySelector(
            `.scroll-indicator-${index + 1}`
          );

          const scrollIndicator1 =
            document.querySelector(`.scroll-indicator-1`);
          const scrollIndicator2 =
            document.querySelector(`.scroll-indicator-2`);

          if (
            scrollIndicator &&
            scrollIndicator.getBoundingClientRect().top < 0 &&
            scrollIndicator.getBoundingClientRect().bottom < 0
          ) {
            scrollIndicator1.style.height = "0%";
            scrollIndicator2.style.height = "0%";
          }
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
    <main className="flex flex-col items-center min-h-screen main left-0">
      <div className="fixed top-0 z-[-2] h-screen w-screen bg-[#000000] bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"></div>
      <nav className="w-full flex justify-center fixed top-0 z-50 h-20 mt-3.5">
        <div className="max-w-[1150px] flex justify-between w-full gap-5 p-5 px-7 border-2 border-[#1C1C26] bg-[hsla(0,0%,5%,.18)] rounded-lg">
          <div className="flex items-center">
            <Image
              src="/Luminous_Pages.png"
              width={200}
              height={100}
              alt="Luminous Pages Logo"
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
                  className="text-white text-base rounded-lg border-2 p-3 font-semibold whitespace-nowrap h-8 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-110 hover:text-[#FFB100]"
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
                  className=" text-white font-semibold text-base whitespace-nowrap w-48  m-2 h-7 flex bg-[#D3A326] text-[#664700] justify-center items-center rounded-lg transition-all hover:scale-105 hover:text-[#453000]"
                  href={"#pricing"}
                >
                  Get Luminous Pages
                </Link>
              </div>
            </div>
          ) : (
            <div className="flex gap-3">
              <div className="flex items-center">
                <Link
                  href={"/login"}
                  className="text-base relative text-white rounded-lg border-2 p-4 font-semibold whitespace-nowrap h-5 inline-flex justify-center items-center gap-[0.5em] transition-all hover:scale-105 hover:text-[#FFB100]"
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
                  className="font-semibold whitespace-nowrap w-28 m-2 h-7 flex bg-[#bd1515] text-base text-white justify-center items-center rounded-lg transition-all hover:scale-105 hover:bg-[#750000]"
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
      <section className="relative top-48 w-full h-full flex flex-col justify-center items-center">
        <section className="flex justify-left max-w-[1100px] gap-4 w-full">
          <div className="">
            <h1 className="font-extrabold lg:text-4xl text-2xl text-left lg:text-wrap flex flex-col gap-5 tracking-tight text-white ">
              <span className="flex flex-wrap gap-3">
                {words.slice(0, 5).map((word, index) => {
                  if (index === 2) {
                    return (
                      <span
                        key={index}
                        className="px-2 relative animate-appear blur"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        <span className="absolute inset-0 bg-[#FFB100] -rotate-[0.5deg]"></span>
                        <span className="relative isolate text-white no-gradient inline-block ">
                          website builder
                        </span>
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={index}
                        className={`inline-block animate-appear`}
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        {word}{" "}
                      </span>
                    );
                  }
                })}
              </span>
              <span className="flex flex-wrap gap-3">
                {words.slice(5, 9).map((word, index) => {
                  if (index === 1) {
                    return (
                      <span
                        key={index}
                        style={{
                          animationDelay: `${index * 0.2}s`,
                        }}
                      >
                        <span
                          className={`${textStyle} inline-block animate-appear blur`}
                        >
                          {typingText}
                        </span>
                      </span>
                    );
                  } else {
                    return (
                      <span
                        key={index}
                        className="inline-block animate-appear blur"
                        style={{
                          animationDelay: `${index * 0.1}s`,
                        }}
                      >
                        {word}{" "}
                      </span>
                    );
                  }
                })}
              </span>
            </h1>

            <h1 className="z-20 relative top-80 lg:whitespace-nowrap lg:text-lg text-base font-bold mt-2 tracking-tight">
              <span className="flex flex-col gap-1 text-center text-white">
                <span>
                  The <span className="underlined-element">ultimate</span> tool
                  for creating{" "}
                  <span className="underlined-element">courses</span>,{" "}
                  <span className="underlined-element">websites</span>, or{" "}
                  <span className="underlined-element">
                    paid-access platforms
                  </span>
                </span>
                <span>
                  <span className="font-extrabold text-xl underlined-element">
                    with ease.
                  </span>
                </span>
              </span>
            </h1>
          </div>
        </section>
        <section className="flex flex-col">
          <section className="justify-center flex">
            {" "}
            <div className="max-w-[1050px] pb-12 z-40 flex flex-col justify-center">
              <h1 className="font-semibold justify-center lg:text-4xl text-2xl mt-28 mb-12 tracking-tight animate-text-gradient inline-flex bg-gradient-to-r from-neutral-900 via-slate-500 to-neutral-500 bg-[200%_auto] bg-clip-text leading-tight text-transparent dark:from-neutral-100 dark:via-slate-400 dark:to-neutral-400">
                What's the platform all about?
              </h1>
              <p className="text-white text-2xl leading-tight">
                Luminous Pages is the ultimate all-in-one solution for creators
                looking to{" "}
                <span className="font-bold underlined-element">
                  monetize their digital content.
                </span>{" "}
                With its intuitive designer, you can quickly create professional
                courses and websites. Seamlessly manage your content and convert
                your audience into paying subscribers.
              </p>
            </div>
          </section>
          <div className="border-b-2 mb-32 mt-5"></div>
          <div className="mb-40">
            <div className="flex flex-col items-center">
              <h1 className="text-white lg:text-5xl text-2xl font-bold mb-24 text-gradient-blue">
                Examples
              </h1>
              <div className="flex gap-20">
                <div className="flex flex-col items-center justify-center w-96 h-[42rem]">
                  <h1 className="text-white mb-5">Blog</h1>
                  <div className="bg-white w-full h-full">website here</div>
                </div>
                <div className="flex flex-col items-center justify-center w-96 h-[42rem]">
                  <h1 className="text-white mb-5">Course</h1>
                  <div className="bg-white w-full h-full">website here</div>
                </div>
                <div className="flex flex-col items-center justify-center w-96 h-[42rem]">
                  <h1 className="text-white mb-5">About page</h1>
                  <div className="bg-white w-full h-full">website here</div>
                </div>
              </div>
            </div>
          </div>
          <section
            className="text-white w-full flex items-center justify-center "
            id="features"
          >
            <div className="max-w-[1040px] w-full flex flex-col">
              <h3 className="flex flex-col text-center mb-16 font-bold lg:text-4xl text-2xl text-gradient-blue-white">
                <span>Design stunning websites</span>
                <span>effortlessly</span>
              </h3>
              <div className="flex flex-col items-start">
                <div
                  className={`flex rounded-lg flex-row align-text-bottom feature ${
                    hoveredIndex === 0 ? "highlighted" : ""
                  }`}
                  id="section-1"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`mr-3 rounded-full h-12 w-12 bg-[#00abab] text-white index-1 flex items-center justify-center text-black glow-index-low ${
                        hoveredIndex === 0 ? "glow-index-high" : ""
                      }`}
                    >
                      1.
                    </div>
                    <div className="scroll-indicator-1 bg-[#00ffff] w-1 h-full mr-3"></div>
                  </div>
                  <div className="flex flex-col pb-4">
                    <h1
                      className={`text-2xl mb-1  ${
                        hoveredIndex === 0 ? "font-bold" : ""
                      }`}
                    >
                      Design
                    </h1>

                    <p className="text-lg w-[24rem] tracking-tight flex flex-col gap-5">
                      <span>
                        Begin by choosing one of our market-optimized templates,
                        then add your own content by customizing it with our
                        designer. Webpages consist of sections in which you can
                        add all sorts of content such as videos, audios, text,
                        images, and quizzes.
                      </span>
                      <span>
                        No need to worry about responsiveness — our designer
                        automatically adapts the website to all devices, making
                        your site look great everywhere.
                      </span>
                    </p>
                  </div>
                  <Image
                    src={"/interface-preview.png"}
                    width={500}
                    height={500}
                    className="pb-5"
                    alt="interface preview"
                  />
                  <div className="ml-8"></div>
                </div>
                <div
                  className={`flex flex-row align-text-bottom feature ${
                    hoveredIndex === 1 ? "highlighted" : ""
                  }`}
                  id="section-2"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`mr-3 rounded-full h-[48px] w-[48px] leading-[48px] index-2 bg-[#00abab] text-white flex items-center justify-center text-black glow-index-low ${
                        hoveredIndex === 1 ? "glow-index-high" : ""
                      }`}
                    >
                      2.
                    </div>
                    <div className="scroll-indicator-2 bg-[#00ffff] w-1 h-full mr-3"></div>
                  </div>
                  <div className="flex flex-col pb-4">
                    <h1
                      className={`text-xl ${
                        hoveredIndex === 1 ? "font-bold" : ""
                      }`}
                    >
                      Analyze
                    </h1>
                    <p className="text-base w-[24rem]">
                      Our website templates are built to drive conversions. For
                      even better performance, we provide weekly reports on user
                      behavior and site performance. Use these insights to
                      discover what works best and optimize your content,
                      enhance user experience, and increase conversions.
                    </p>
                  </div>
                  <Image
                    src={"/analytics preview.png"}
                    width={500}
                    height={500}
                    alt="analytics preview"
                  />
                  <div className="ml-8"></div>
                </div>
                <div
                  className={`flex mb-20 flex-row align-text-bottom feature ${
                    hoveredIndex === 2 ? "highlighted" : ""
                  }`}
                  id="section-3"
                >
                  <div
                    className={`mr-3 rounded-full h-12 w-12 bg-[#00abab] index-3 text-white flex items-center justify-center text-black glow-index-low ${
                      hoveredIndex === 2 ? "glow-index-high" : ""
                    }`}
                  >
                    3.
                  </div>
                  <div className="flex flex-col pb-4">
                    <h1
                      className={`text-xl ${
                        hoveredIndex === 2 ? "font-bold" : ""
                      }`}
                    >
                      Ease of Use
                    </h1>
                    <p className="text-base w-[24rem]">
                      Webpages consist of sections in which you can add all
                      sorts of content such as videos, audios, text, images,
                      quizzes. We also provide seamless integration with Stripe
                      payments, subscriptions, analytics. Choose one of our
                      market-optimized templates, then add your own content by
                      customizing it with our designer.
                    </p>
                  </div>
                  <div className="ml-8"></div>
                </div>
              </div>
            </div>
          </section>
          <section className="flex gap-36 w-full items-center justify-center">
            <div className="flex flex-col items-center mb-20">
              <h1 className="lg:text-5xl text-xl font-bold text-gradient-light-blue mb-20 p-2">
                Pick a plan that is best for your needs
              </h1>
              <div className="flex items-center p-2 bg-[#283140] rounded-lg gap-3 px-2 mb-8">
                <button
                  onClick={() => setMonthly(true)}
                  className={`text-white text-lg p-2 rounded-lg px-3 ${
                    monthly === true
                      ? "bg-[#00091D]"
                      : "bg-[#283140] hover:scale-105"
                  }`}
                >
                  Monthly Payment
                </button>
                <button
                  onClick={() => setMonthly(false)}
                  className={`text-white text-lg p-2 rounded-lg px-3 ${
                    monthly === true
                      ? "bg-[#283140] hover:scale-105"
                      : "bg-[#00091D]"
                  }`}
                >
                  Annual Payment
                </button>
              </div>
              <div className="flex gap-5 items-end">
                <div className="flex p-5 items-start flex-col w-[15rem] h-[360px] gap-2 bg-[#161B1F] rounded-lg py-7">
                  <h1 className="text-[#999999] font-medium text-xl mb-1">
                    Individual
                  </h1>
                  <h1 className="text-5xl text-white font-bold">
                    {monthly === true ? "$79" : "$65"}
                  </h1>
                  <h1 className="text-sm text-white text-[#999999] mt-2">
                    Per month
                  </h1>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 text-white text-base">
                      <Image
                        src={"/checkmark.svg"}
                        width={25}
                        height={25}
                        alt="checkmark"
                      />
                      5% Transaction fee
                    </div>
                    <div className="flex gap-2 text-white text-base">
                      <Image
                        src={"/checkmark.svg"}
                        width={25}
                        height={25}
                        alt="checkmark"
                      />
                      Unlimited pages
                    </div>
                    <div className="flex gap-2 text-white text-base">
                      <Image
                        src={"/checkmark.svg"}
                        width={25}
                        height={25}
                        alt="checkmark"
                      />
                      Analytics
                    </div>
                    <div className="flex gap-2 text-white text-base">
                      <Image src={"/checkmark.svg"} width={25} height={25} />
                      Cancel anytime
                    </div>
                  </div>
                  <button className="flex text-white text-lg gap-2 w-full p-2 mt-2 rounded-lg gradient-blue-yellow justify-center items-center hover:scale-105 select-button">
                    Select{" "}
                    <Image
                      src={"/right-arrow.svg"}
                      width={20}
                      height={15}
                      className="arrow"
                      alt="right arrow"
                    />
                  </button>
                </div>
                <div className="flex p-5 items-start flex-col w-[15rem] h-[360px] gap-2 bg-[#161B1F] rounded-lg py-7">
                  <h1 className="text-[#999999] font-medium text-xl mb-1">
                    Pro
                  </h1>
                  <h1 className="text-5xl text-white font-bold">
                    {monthly === true ? "$99" : "$79"}
                  </h1>
                  <h1 className="text-sm text-white text-[#999999] mt-2">
                    Per month
                  </h1>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2 text-white text-base">
                      <Image
                        src={"/checkmark.svg"}
                        width={25}
                        height={25}
                        alt="checkmark"
                      />
                      3% Transaction fee
                    </div>
                    <div className="flex gap-2 text-white text-base">
                      <Image
                        src={"/checkmark.svg"}
                        width={25}
                        height={25}
                        alt="checkmark"
                      />
                      Unlimited pages
                    </div>
                    <div className="flex gap-2 text-white text-base">
                      <Image
                        src={"/checkmark.svg"}
                        width={25}
                        height={25}
                        alt="checkmark"
                      />
                      Analytics
                    </div>
                    <div className="flex gap-2 text-white text-base">
                      <Image
                        src={"/checkmark.svg"}
                        width={25}
                        height={25}
                        alt="checkmark"
                      />
                      Cancel anytime
                    </div>
                  </div>
                  <button className="flex text-white text-lg gap-2 w-full p-2 mt-2 rounded-lg gradient-blue-yellow justify-center items-center hover:scale-105 select-button">
                    Select{" "}
                    <Image
                      src={"/right-arrow.svg"}
                      width={20}
                      height={15}
                      className="arrow"
                      alt="right arrow"
                    />
                  </button>
                </div>
                <div className="flex flex-col">
                  <div className="h-7 bg-[#2492FF] text-sm rounded-t-lg text-white text-center py-1 z-20 relative">
                    Most popular
                  </div>
                  <div className="flex p-5 items-start flex-col w-[15rem] h-[390px] gap-2 bg-[#152773] blue-blur rounded-lg py-7 z-10 relative">
                    <h1 className="text-[#999999] font-medium text-xl mb-1">
                      Business
                    </h1>
                    <h1 className="text-5xl text-white font-bold">
                      {monthly === true ? "$129" : "$105"}
                    </h1>
                    <h1 className="text-sm text-white text-[#999999] mt-2">
                      Per month
                    </h1>
                    <div className="flex flex-col gap-2">
                      <div className="flex gap-2 text-white text-base">
                        <Image
                          src={"/checkmark.svg"}
                          width={25}
                          height={25}
                          alt="checkmark"
                        />
                        2% Transaction fee
                      </div>
                      <div className="flex gap-2 text-white text-base">
                        <Image
                          src={"/checkmark.svg"}
                          width={25}
                          height={25}
                          alt="checkmark"
                        />
                        Unlimited pages
                      </div>
                      <div className="flex gap-2 text-white text-base">
                        <Image
                          src={"/checkmark.svg"}
                          width={25}
                          height={25}
                          alt="checkmark"
                        />
                        Analytics
                      </div>
                      <div className="flex gap-2 text-white text-base">
                        <Image
                          src={"/checkmark.svg"}
                          width={25}
                          height={25}
                          alt="checkmark"
                        />
                        Custom domain
                      </div>
                      <div className="flex gap-2 text-white text-base">
                        <Image
                          src={"/checkmark.svg"}
                          width={25}
                          height={25}
                          alt="checkmark"
                        />
                        Cancel anytime
                      </div>
                    </div>
                    <button className="flex text-white text-lg gap-2 w-full p-2 mt-2 rounded-lg gradient-orange-red justify-center items-center hover:scale-105 select-button">
                      Select{" "}
                      <Image
                        src={"/right-arrow.svg"}
                        width={20}
                        height={15}
                        className="arrow"
                        alt="right arrow"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </section>
      </section>
    </main>
  );
}
