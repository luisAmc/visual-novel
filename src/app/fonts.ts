import { Roboto_Mono, Open_Sans, Roboto_Flex } from "next/font/google";
import localFont from "next/font/local";

export const ROBOTO_MONO = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export const ROBOTO_FLEX = Roboto_Flex({ subsets: ["latin"], display: "swap" });

export const OPEN_SANS = Open_Sans({
  subsets: ["latin"],
  display: "swap",
});

export const CHILLER_FONT = localFont({
  src: "./chiller.ttf",
  display: "swap",
});
