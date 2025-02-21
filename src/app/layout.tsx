import clsx from "clsx";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={clsx("flex min-h-screen items-center justify-center")}>
        {children}
      </body>
    </html>
  );
}
