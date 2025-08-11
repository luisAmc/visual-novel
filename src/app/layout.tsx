import ReactLenis from "lenis/react";
import "./globals.css";
import { DotCursor } from "~/components/DotCursor";

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
