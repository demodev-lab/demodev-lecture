"use client";

const categories = [
  {
    name: "재테크가족",
    icon: "🔥",
    bgColor: "bg-orange-500",
    textColor: "text-white",
  },
  {
    name: "오직실업",
    icon: "ORIGINAL",
    bgColor: "bg-black",
    textColor: "text-white",
  },
  {
    name: "나나유료",
    icon: "💰",
    bgColor: "bg-blue-500",
    textColor: "text-white",
  },
  {
    name: "커뮤니티",
    icon: "🏠",
    bgColor: "bg-green-500",
    textColor: "text-white",
  },
  {
    name: "몰라대고",
    icon: "📊",
    bgColor: "bg-brand-500",
    textColor: "text-white",
  },
  {
    name: "스마트강의",
    icon: "📱",
    bgColor: "bg-blue-400",
    textColor: "text-white",
  },
  {
    name: "내구끝",
    icon: "💎",
    bgColor: "bg-teal-500",
    textColor: "text-white",
  },
  {
    name: "위험한비만",
    icon: "📈",
    bgColor: "bg-green-600",
    textColor: "text-white",
  },
  {
    name: "강의일정",
    icon: "📅",
    bgColor: "bg-red-500",
    textColor: "text-white",
  },
  {
    name: "전문가집단",
    icon: "👨‍💼",
    bgColor: "bg-indigo-500",
    textColor: "text-white",
  },
];

export default function CategoryIcons() {
  return (
    <section className="py-4 sm:py-6 md:py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start sm:justify-center items-center gap-3 sm:gap-4 md:gap-6 overflow-x-auto scrollbar-hide">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer group"
            >
              <div
                className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 ${category.bgColor} rounded-xl flex items-center justify-center mb-1 sm:mb-2 group-hover:scale-105 transition-transform shadow-lg`}
              >
                {category.icon === "ORIGINAL" ? (
                  <span className="text-[8px] sm:text-[10px] md:text-xs font-bold text-white">ORIGINAL</span>
                ) : (
                  <span className="text-lg sm:text-xl md:text-2xl">{category.icon}</span>
                )}
              </div>
              <span className="text-xs sm:text-sm font-medium text-gray-700 text-center leading-tight max-w-[60px] sm:max-w-[70px] md:max-w-[80px]">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
