export interface Course {
  id: number;
  badge: string;
  title: string;
  instructor?: string;
  description?: string;
  rating: number | null;
  reviews: number | null;
  category: string;
  image: string;
  isNew?: boolean;
  url: string;
}

export const courses: Course[] = [
  {
    id: 1,
    badge: "2025년 7월 최대할",
    title: "제태로 돈버는 부동산 기본기",
    instructor: "나나",
    rating: 4.96,
    reviews: 4446,
    category: "나나",
    image: "https://ext.same-assets.com/697090280/161372403.webp",
    isNew: true,
    url: "https://www.latpeed.com/products/rR7ny?utm_source=youtube&utm_medium=video&utm_campaign=dmdwebchall",
  },
  {
    id: 2,
    badge: "할당 200만원으로 1억",
    title: "제태크 기초반",
    instructor: "나나",
    rating: 4.67,
    reviews: 1252,
    category: "나나, 경제분석회, 절약",
    image: "https://ext.same-assets.com/697090280/540394159.webp",
    url: "https://www.latpeed.com/products/rR7ny?utm_source=youtube&utm_medium=video&utm_campaign=dmdwebchall",
  },
  {
    id: 3,
    badge: "BEST",
    title: "평생 쓰는 월300 프로젝트로 맞춤 완성법!",
    instructor: "상상프로젝트",
    rating: 4.89,
    reviews: 394,
    category: "상상프로젝트",
    image: "https://ext.same-assets.com/697090280/1243079901.png",
    url: "https://www.latpeed.com/products/rR7ny?utm_source=youtube&utm_medium=video&utm_campaign=dmdwebchall",
  },
  {
    id: 4,
    badge: "2025 6월 최신",
    title: "미리 알면 1억 버는 부동산 절세 마스터",
    instructor: "제취라쓰",
    rating: 4.93,
    reviews: 344,
    category: "제취라쓰",
    image: "https://ext.same-assets.com/697090280/1216594416.png",
    url: "https://www.latpeed.com/products/rR7ny?utm_source=youtube&utm_medium=video&utm_campaign=dmdwebchall",
  },
];

export const challenges: Course[] = [
  {
    id: 1,
    badge: "BEST",
    title: "랜딩페이지 챌린지",
    instructor: "",
    rating: 4.96,
    reviews: 4446,
    category: "웹개발",
    image: "/demodev_word.svg",
    isNew: true,
    url: "https://www.latpeed.com/products/rR7ny?utm_source=youtube&utm_medium=video&utm_campaign=dmdwebchall",
  },
  {
    id: 2,
    badge: "BEST",
    title: "크롤링 마스터 챌린지",
    instructor: "",
    rating: 4.67,
    reviews: 1252,
    category: "크롤링",
    image: "/demodev_word.svg",
    url: "https://www.latpeed.com/products/kU30C?utm_source=youtube&utm_medium=video&utm_campaign=dmdwebchall",
  },
];
