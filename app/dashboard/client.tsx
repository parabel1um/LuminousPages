"use client";

import { useSession } from "next-auth/react";
import { Session } from "next-auth";

const Client: React.FC<{ initialSession: Session | null }> = ({
  initialSession,
}) => {
  const { data: session } = useSession();

  const userSession = session || initialSession;

  if (!userSession) {
    return <div>Loading...</div>;
  }

  console.log(userSession);

  return <div>{userSession.user?.name}</div>;
};

export default Client;
