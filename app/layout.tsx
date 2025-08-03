import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ConsoleEasterEgg from "@/components/ConsoleEasterEgg";
import { AuthProvider } from "@/components/auth/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "대모산 개발단 - 실전 성장형 챌린지",
  description: "대모산 개발단과 함께하는 실전 성장형 챌린지",
  icons: {
    icon: "/favicon.ico?v=111",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body
        suppressHydrationWarning
        className="antialiased flex flex-col min-h-screen"
      >
        <AuthProvider>
          <Header />
          <main className="flex-1">
            <ClientBody>{children}</ClientBody>
          </main>
          <Footer />
          <ConsoleEasterEgg />
        </AuthProvider>
      </body>
    </html>
  );
}
