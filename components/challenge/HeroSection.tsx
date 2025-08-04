"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-r from-sky-300 to-sky-500 px-4 py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between">
          {/* Text Content */}
          <div className="flex-1 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Adobe 자격증으로
              <br />
              글로벌 스펙 한 방에!
            </h1>
            <p className="text-lg text-gray-700 mb-8">
              스페셜부터 스킬업까지 따즈아 프리패스로!
            </p>
          </div>

          {/* Adobe Suite Icons */}
          <div className="flex-1 flex justify-center items-center space-x-4">
            {/* Premiere Pro */}
            <div className="w-24 h-24 bg-brand-700 rounded-xl shadow-lg flex items-center justify-center transform rotate-6">
              <span className="text-white font-bold text-2xl">Pr</span>
            </div>

            {/* Photoshop */}
            <div className="w-24 h-24 bg-blue-600 rounded-xl shadow-lg flex items-center justify-center">
              <span className="text-white font-bold text-2xl">Ps</span>
            </div>

            {/* Illustrator */}
            <div className="w-24 h-24 bg-orange-600 rounded-xl shadow-lg flex items-center justify-center transform -rotate-6">
              <span className="text-white font-bold text-2xl">Ai</span>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center space-x-2 mt-8">
          <div className="w-2 h-2 bg-white rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
          <div className="w-2 h-2 bg-white/50 rounded-full"></div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="sm"
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        aria-label="이전 슬라이드"
      >
        <ChevronLeft className="w-6 h-6" />
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20"
        aria-label="다음 슬라이드"
      >
        <ChevronRight className="w-6 h-6" />
      </Button>
    </section>
  );
}
