import Image from "next/image";
import "@/styles/global.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <main className="flex flex items-center justify-between min-h-screen main left-0">
      <div className="flex items-center">
        <Image
          src="/LuminousPages.png"
          width={300}
          height={120}
          alt="Luminous Pages Logo"
        />
      </div>
    </main>
  );
};

export default Dashboard;
