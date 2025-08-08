import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import Footer from "@/components/@shared/Footer";
import Header from "@/components/@shared/Header";
import ConsoleEasterEgg from "@/components/@shared/ConsoleEasterEgg";
import { AuthProvider } from "@/components/auth/AuthContext";
import { SupabaseAuthProvider } from "@/components/auth/SupabaseAuthContext";
import ParticlesBackground from "@/components/ui/ParticlesBackground";
import { FavoriteLecturesProvider } from "@/contexts/FavoriteLecturesContext";

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
        className="antialiased flex flex-col min-h-screen relative bg-transparent"
      >
        <ParticlesBackground />
        <SupabaseAuthProvider>
          <AuthProvider>
            <FavoriteLecturesProvider>
              <Header />
              <main className="flex-1">
                <ClientBody>{children}</ClientBody>
              </main>
              <Footer />
              <ConsoleEasterEgg />
            </FavoriteLecturesProvider>
          </AuthProvider>
        </SupabaseAuthProvider>
      </body>
    </html>
  );
}
