import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import HtmlWrapper from "@/components/HtmlWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Style Studio - Ihr Friseursalon",
  description: "Entdecken Sie unsere professionellen Friseurdienstleistungen",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <HtmlWrapper>
      <Header />
      {children}
    </HtmlWrapper>
  );
}
