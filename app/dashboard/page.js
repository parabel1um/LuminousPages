import React from "react";
import "@/styles/global.css";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen flex-col items-center">Dashboard</div>
  );
};

export default Dashboard;
