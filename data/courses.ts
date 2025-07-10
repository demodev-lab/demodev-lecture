export interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  likeCount: number;
  thumbnail: string;
  isLiked?: boolean;
  url: string;
}

// TODO: 챌린지 타입 따로 정의 필
export const challenges: Course[] = [
  {
    id: 1,
    title: "랜딩페이지 챌린지",
    instructor: "",
    category: "웹개발",
    price: 49500,
    rating: 0,
    ratingCount: 0,
    likeCount: 0,
    thumbnail: "/channels4_profile.jpg",
    url: "https://www.latpeed.com/products/rR7ny?utm_source=youtube&utm_medium=video&utm_campaign=dmdwebchall",
  },
  {
    id: 2,
    title: "크롤링 마스터 챌린지",
    instructor: "",
    category: "웹개발",
    price: 100000,
    rating: 0,
    ratingCount: 0,
    likeCount: 0,
    thumbnail: "/channels4_profile.jpg",
    url: "https://www.latpeed.com/products/kU30C?utm_source=youtube&utm_medium=video&utm_campaign=dmdwebchall",
  },
];

export const newCourses: Course[] = [
  {
    id: 1,
    title: "실무에 바로 쓰는 SketchUp & Enscape 건축 모델링",
    instructor: "SketchUp",
    category: "3D 모델링",
    price: 118000,
    rating: 0,
    ratingCount: 0,
    likeCount: 2,
    thumbnail:
      "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 2,
    title: "컬러 그레이딩, 다빈치 리졸브로 배우는 실무 컬러 툴",
    instructor: "다빈치리졸브",
    category: "영상편집",
    price: 189000,
    rating: 0,
    ratingCount: 0,
    likeCount: 4,
    thumbnail:
      "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 3,
    title: "왕초보도 따라하는 완성도 최강의 블록체인 게임",
    instructor: "캐릭터",
    category: "게임개발",
    price: 80000,
    rating: 0,
    ratingCount: 0,
    likeCount: 7,
    thumbnail:
      "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=400&h=300&fit=crop",
    url: "",
  },
];

export const popularCourses: Course[] = [
  {
    id: 4,
    title: "헤이, 미친거아니야! 국가자격 실기 특수화장 강사",
    instructor: "미용실무자격국가(헤어)",
    category: "미용",
    price: 79000,
    rating: 0,
    ratingCount: 0,
    likeCount: 16,
    thumbnail:
      "https://images.unsplash.com/photo-1560472355-536de3962603?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 5,
    title: "블렌더 입문자를 위한 SD 캐릭터 모델링",
    instructor: "Blender",
    category: "3D 모델링",
    price: 59000,
    rating: 0,
    ratingCount: 0,
    likeCount: 67,
    thumbnail:
      "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 6,
    title: "파이썬으로 배우는 데이터 분석 : AI & 머신러닝",
    instructor: "Python",
    category: "프로그래밍",
    price: 76000,
    rating: 0,
    ratingCount: 0,
    likeCount: 38,
    thumbnail:
      "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
    url: "",
  },
];

export const editorChoiceCourses: Course[] = [
  {
    id: 7,
    title: "애니메이션, 움직이는 일러스트 : After Effects",
    instructor: "After Effects",
    category: "영상편집",
    price: 84000,
    rating: 0,
    ratingCount: 0,
    likeCount: 261,
    thumbnail:
      "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 8,
    title: "ACP 자격증 비대면 프로모션 : Photoshop CC2023",
    instructor: "ACP 비대면 프로모션",
    category: "그래픽디자인",
    price: 110000,
    rating: 4,
    ratingCount: 179,
    likeCount: 179,
    thumbnail:
      "https://images.unsplash.com/photo-1609921212029-bb5a28e60960?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 9,
    title: "웹소설 작가 도전하기",
    instructor: "웹소설",
    category: "창작",
    price: 86000,
    rating: 0,
    ratingCount: 0,
    likeCount: 131,
    thumbnail:
      "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400&h=300&fit=crop",
    url: "",
  },
];

export const hobbyCourses: Course[] = [
  {
    id: 10,
    title: "두잉 요가 : On the Mat [초급~중급]",
    instructor: "요가",
    category: "운동",
    price: 55000,
    rating: 4,
    ratingCount: 134,
    likeCount: 134,
    thumbnail:
      "https://images.unsplash.com/photo-1545389336-cf090694435e?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 11,
    title: "바리스타 베이직",
    instructor: "바리스타",
    category: "쿠킹",
    price: 67000,
    rating: 4,
    ratingCount: 226,
    likeCount: 226,
    thumbnail:
      "https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 12,
    title: "Mins 베이킹 하우스",
    instructor: "제과제빵",
    category: "쿠킹",
    price: 65000,
    rating: 0,
    ratingCount: 0,
    likeCount: 134,
    thumbnail:
      "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=300&fit=crop",
    url: "",
  },
];

export const certificationCourses: Course[] = [
  {
    id: 13,
    title: "헤어 국가자격(실기)",
    instructor: "미용실무자격국가(헤어)",
    category: "미용자격증",
    price: 80000,
    rating: 0,
    ratingCount: 0,
    likeCount: 170,
    thumbnail:
      "https://images.unsplash.com/photo-1582095133179-bfd08e2fc6b3?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 14,
    title: "에스테틱 국가자격(실기)",
    instructor: "미용실무자격국가(피부미용)",
    category: "미용자격증",
    price: 84000,
    rating: 4,
    ratingCount: 315,
    likeCount: 315,
    thumbnail:
      "https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=400&h=300&fit=crop",
    url: "",
  },
  {
    id: 15,
    title: "한식조리기능사(실기)",
    instructor: "한식조리기능사",
    category: "요리자격증",
    price: 108000,
    rating: 5,
    ratingCount: 241,
    likeCount: 241,
    thumbnail:
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    url: "",
  },
];
