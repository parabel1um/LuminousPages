"use client";

import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Client = ({ initialSession }) => {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      console.log("client session not available");
    }
  }, [session]);

  const userSession = session || initialSession;

  if (!userSession) {
    return <div>Loading...</div>;
  }

  console.log(userSession);

  return <div>{userSession.user.name}</div>;
};

export default Client;
