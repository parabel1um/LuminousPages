export const metadata = {
  title: "CourseSurge",
  description: "Create courses easily",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
