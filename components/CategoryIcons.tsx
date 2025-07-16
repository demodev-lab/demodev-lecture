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
    bgColor: "bg-purple-500",
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
    <section className="py-8 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-center items-center space-x-6 overflow-x-auto">
          {categories.map((category, index) => (
            <div
              key={index}
              className="flex flex-col items-center min-w-[80px] cursor-pointer group"
            >
              <div
                className={`w-16 h-16 ${category.bgColor} rounded-xl flex items-center justify-center mb-2 group-hover:scale-105 transition-transform shadow-lg`}
              >
                {category.icon === "ORIGINAL" ? (
                  <span className="text-xs font-bold text-white">ORIGINAL</span>
                ) : (
                  <span className="text-2xl">{category.icon}</span>
                )}
              </div>
              <span className="text-sm font-medium text-gray-700 text-center leading-tight">
                {category.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
