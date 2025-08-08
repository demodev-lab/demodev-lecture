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
    // 개발 편의를 위해 인증 로직 임시 비활성화
    // TODO: 실제 운영 시에는 주석을 해제하고 proper 인증 로직 구현 필요
    
    // const isAuthenticated = localStorage.getItem("admin_authenticated");
    // if (!isAuthenticated) {
    //   router.push("/admin/login");
    // }
    
    // 개발용 임시 인증 토큰 자동 설정
    localStorage.setItem("admin_authenticated", "true");
  }, [router]);

  // 임시 사용자 데이터 (실제로는 인증 상태에서 가져와야 함)
  const user = {
    name: "강의 관리자",
    email: "lecture.admin@demolearn.com",
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