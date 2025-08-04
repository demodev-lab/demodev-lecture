"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";
import AuthForm from "./AuthForm";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!mounted || !isOpen) {
    return null;
  }

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl w-full max-w-md relative animate-fadeIn mx-4 sm:mx-0">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-center mb-2">
            {mode === "login" ? "대모산개발단" : "대모산개발단"}
          </h2>
          <p className="text-center text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base whitespace-pre-line">
            {mode === "login"
              ? "지금 가입 하고\n첫구매 할인쿠폰 받으세요!"
              : "지금 가입 하고\n첫구매 할인쿠폰 받으세요!"}
          </p>

          <AuthForm mode={mode} onModeChange={setMode} onSuccess={onClose} />
        </div>
      </div>
    </div>
  );
}