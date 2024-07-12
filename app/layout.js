import { getServerSession } from "next-auth";
import SessionProvider from "../utils/SessionProvider";
import RouteChangeTracker from "./routeChange";

export const metadata = {
  title: "Luminous Pages",
  description: "Create webpages easily",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <RouteChangeTracker />
          <div className="mx-auto text-2xl gap-2 mb-10">{children}</div>
        </SessionProvider>
      </body>
    </html>
  );
}
