import ReactLenis from "lenis/react";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ReactLenis root>
        <body>{children}</body>
      </ReactLenis>
    </html>
  );
}
