import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "데모데브 - 창작별, 교재별, 고퀄리티 강의 페이지 시스템",
  description: "스펙설부터 스킬업까지 따뜻한 프리패스토리",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="antialiased">
        <Script
          src="https://unpkg.com/same-runtime/dist/index.global.js"
          strategy="beforeInteractive"
          crossOrigin="anonymous"
        />
        <ClientBody>{children}</ClientBody>
      </body>
    </html>
  );
}