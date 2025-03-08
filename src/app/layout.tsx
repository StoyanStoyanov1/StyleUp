import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/header/Header";
import { LanguageProvider } from "@/context/language/LanguageContext";
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
  title: "Home",
  description: "That is a home page",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <LanguageProvider> 
      <HtmlWrapper>
        <Header />
        {children}
      </HtmlWrapper>
    </LanguageProvider>
  );
}
