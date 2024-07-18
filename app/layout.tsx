import { ReactNode } from "react";
import { getServerSession } from "next-auth";
import { Session } from "next-auth";
import AuthProvider from "../utils/AuthProvider";
import RouteChangeTracker from "./routeChange";

export const metadata = {
  title: "Luminous Pages",
  description: "Create webpages easily",
};

interface RootLayoutProps {
  children: ReactNode;
}

export default async function RootLayout({ children }: RootLayoutProps) {
  const session: Session | null = await getServerSession();

  return (
    <html lang="en">
      <body>
        <AuthProvider session={session}>
          <RouteChangeTracker />
          <div className="mx-auto text-2xl gap-2 mb-10 flex justify-center">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  );
}
