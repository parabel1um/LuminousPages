import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Image from "next/image";
import "@/styles/global.css";
import Client from "./client";

const Dashboard = async () => {
  const serverSession = await getServerSession();

  if (!serverSession) {
    redirect("/");
  }

  return (
    <main className="flex flex-row items-center w-full h-full left-0 max-w-6xl mt-20">
      <div className="w-1/6 flex items-start flex-col h-full">
        <Image
          src="/Luminous_Pages.png"
          width={300}
          height={120}
          alt="Luminous Pages Logo"
        />
        <div>
          <Client initialSession={serverSession} />
        </div>
      </div>
      <div className="flex items-center w-5/6 h-96"></div>
    </main>
  );
};

export default Dashboard;
