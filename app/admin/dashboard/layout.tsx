"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { Header } from "@/components/admin/Header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    // 인증 상태 확인
    const isAuthenticated = localStorage.getItem("admin_authenticated");
    if (!isAuthenticated) {
      router.push("/admin/login");
    }
  }, [router]);

  // 임시 사용자 데이터 (실제로는 인증 상태에서 가져와야 함)
  const user = {
    name: "관리자",
    email: "admin@demodev.com",
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header user={user} />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </main>
      </div>
    </div>
  );
}