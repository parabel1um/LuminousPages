import { getServerSession } from "next-auth";
import SessionProvider from "../utils/SessionProvider";

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
          <div className="mx-auto max-w-5xl text-2xl gap-2 mb-10">
            {children}
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
