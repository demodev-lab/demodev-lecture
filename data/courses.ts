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
    badge: "웹개발",
    title: "개발 몰라도 AI로 3시간이면 웹사이트 코딩 가능",
    instructor: "",
    rating: 4.96,
    reviews: 4446,
    category: "웹개발",
    image: "https://img.youtube.com/vi/VIHDmUJY4f0/maxresdefault.jpg",
    isNew: true,
    url: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
  },
  {
    id: 2,
    badge: "웹개발",
    title: "바이브 코딩, 반드시 알아야 하는 것",
    instructor: "",
    rating: 4.67,
    reviews: 1252,
    category: "웹개발",
    image: "https://img.youtube.com/vi/z4HfvrPA_kI/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
  },
  {
    id: 3,
    badge: "BEST",
    title: "개발 아예 몰라도 커서로 AI 서비스 만들기",
    instructor: "",
    rating: 4.89,
    reviews: 394,
    category: "",
    image: "https://img.youtube.com/vi/NLn2klcB-F0/maxresdefault.jpg",
    url: "https://www.youtube.com/watch?v=NLn2klcB-F0",
  },
  {
    id: 4,
    badge: "앱개발",
    title: "풀스택 앱 처음부터 끝까지? 바이브 코딩으로 직접 보여드립니다",
    instructor: "",
    rating: 4.93,
    reviews: 344,
    category: "",
    image: "https://img.youtube.com/vi/px3DyO18yMc/maxresdefault.jpg",
    url: "https://youtu.be/px3DyO18yMc",
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
