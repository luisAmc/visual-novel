import { Roboto_Mono, Montserrat } from "next/font/google";
import localFont from "next/font/local";

export const ROBOTO_MONO = Roboto_Mono({ subsets: ["latin"], display: "swap" });

export const MONTSERRAT_FONT = Montserrat({
  subsets: ["latin"],
  display: "swap",
});

export const CHILLER_FONT = localFont({
  src: "./chiller.ttf",
  display: "swap",
});
