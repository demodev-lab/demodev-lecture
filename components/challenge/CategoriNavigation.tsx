"use client";

import {
  Palette,
  Code,
  Gamepad2,
  MousePointer,
  ChefHat,
  Dumbbell,
  Bike,
  Mountain,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";

const categories = [
  { id: 1, name: "디자인·CG", icon: Palette, isActive: false },
  { id: 2, name: "코딩·IT", icon: Code, isActive: true },
  { id: 3, name: "게임·웹툴", icon: Gamepad2, isActive: false },
  { id: 4, name: "뷰티·미용", icon: MousePointer, isActive: false },
  { id: 5, name: "쿠킹·베이킹", icon: ChefHat, isActive: false },
  { id: 6, name: "승무원·취업", icon: Dumbbell, isActive: false },
  { id: 7, name: "라이프스타일", icon: Bike, isActive: false },
  { id: 8, name: "여행", icon: Mountain, isActive: false },
];

export default function CategoryNavigation() {
  return (
    <section className="bg-white border-b border-gray-200 px-4 py-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative">
          {/* Scroll Left Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          {/* Categories */}
          <div className="flex items-center justify-center space-x-8 overflow-x-auto scrollbar-hide px-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <div
                  key={category.id}
                  className={`flex flex-col items-center space-y-2 min-w-fit cursor-pointer group ${
                    category.isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                    category.isActive
                      ? 'bg-blue-100'
                      : 'bg-gray-100 group-hover:bg-gray-200'
                  }`}>
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-white shadow-md"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </section>
  );
}
