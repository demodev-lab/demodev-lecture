import { Lecture } from "@/types/lecture";

export const dummyLectures: Lecture[] = [
  {
    id: "1",
    title: "개발 몰라도 AI로 3시간이면 웹사이트 코딩 가능",
    subtitle: "AI를 활용한 노코드 웹 개발 완벽 가이드",
    instructor: "대모산개발단",
    description: "프로그래밍 경험이 전혀 없어도 AI 도구를 활용하여 3시간 만에 나만의 웹사이트를 만들 수 있습니다. HTML, CSS, JavaScript의 기초부터 AI 프롬프트 작성법까지 단계별로 학습합니다.",
    thumbnail: "https://img.youtube.com/vi/VIHDmUJY4f0/maxresdefault.jpg",
    badge: "웹개발",
    category: "웹개발",
    totalDuration: 10800, // 3 hours
    totalChapters: 12,
    completedChapters: 0,
    progress: 0,
    rating: 4.96,
    reviewCount: 4446,
    sections: [
      {
        id: "section1",
        title: "AI 웹개발 시작하기",
        order: 1,
        chapters: [
          {
            id: "ch1",
            title: "강의 소개 및 개발 환경 설정",
            duration: 600,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 1,
            completed: false
          },
          {
            id: "ch2",
            title: "AI 도구 소개 - ChatGPT, Claude, Cursor",
            duration: 900,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 2,
            completed: false
          },
          {
            id: "ch3",
            title: "프롬프트 엔지니어링 기초",
            duration: 1200,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 3,
            completed: false
          }
        ]
      },
      {
        id: "section2",
        title: "HTML/CSS 기초와 AI 활용",
        order: 2,
        chapters: [
          {
            id: "ch4",
            title: "HTML 구조 이해하기",
            duration: 800,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 4,
            completed: false
          },
          {
            id: "ch5",
            title: "CSS로 스타일링하기",
            duration: 1000,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 5,
            completed: false
          },
          {
            id: "ch6",
            title: "AI로 반응형 레이아웃 만들기",
            duration: 1200,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 6,
            completed: false
          }
        ]
      },
      {
        id: "section3",
        title: "실전 프로젝트",
        order: 3,
        chapters: [
          {
            id: "ch7",
            title: "포트폴리오 웹사이트 기획",
            duration: 600,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 7,
            completed: false
          },
          {
            id: "ch8",
            title: "AI와 함께 메인 페이지 만들기",
            duration: 1500,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 8,
            completed: false
          },
          {
            id: "ch9",
            title: "프로젝트 갤러리 구현",
            duration: 1200,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 9,
            completed: false
          },
          {
            id: "ch10",
            title: "연락처 폼 추가하기",
            duration: 900,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 10,
            completed: false
          },
          {
            id: "ch11",
            title: "배포하기 - GitHub Pages",
            duration: 800,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 11,
            completed: false
          },
          {
            id: "ch12",
            title: "마무리 및 다음 단계",
            duration: 400,
            videoUrl: "https://www.youtube.com/watch?v=VIHDmUJY4f0",
            order: 12,
            completed: false
          }
        ]
      }
    ],
    enrolledAt: "2025-01-15T09:00:00Z",
    lastWatchedAt: undefined,
    lastWatchedChapterId: undefined
  },
  {
    id: "2",
    title: "바이브 코딩, 반드시 알아야 하는 것",
    subtitle: "AI 시대의 새로운 개발 패러다임",
    instructor: "대모산개발단",
    description: "바이브 코딩이란 무엇이며, 왜 개발자들이 주목해야 하는지 알아봅니다. AI와 함께하는 효율적인 개발 방법론을 학습합니다.",
    thumbnail: "https://img.youtube.com/vi/z4HfvrPA_kI/maxresdefault.jpg",
    badge: "웹개발",
    category: "웹개발",
    totalDuration: 7200, // 2 hours
    totalChapters: 8,
    completedChapters: 3,
    progress: 37.5,
    rating: 4.67,
    reviewCount: 1252,
    sections: [
      {
        id: "section1",
        title: "바이브 코딩 개념",
        order: 1,
        chapters: [
          {
            id: "ch1",
            title: "바이브 코딩이란?",
            duration: 900,
            videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
            order: 1,
            completed: true
          },
          {
            id: "ch2",
            title: "전통적 코딩 vs 바이브 코딩",
            duration: 1200,
            videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
            order: 2,
            completed: true
          }
        ]
      },
      {
        id: "section2",
        title: "실전 바이브 코딩",
        order: 2,
        chapters: [
          {
            id: "ch3",
            title: "효과적인 프롬프트 작성법",
            duration: 1000,
            videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
            order: 3,
            completed: true
          },
          {
            id: "ch4",
            title: "코드 리뷰와 개선",
            duration: 800,
            videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
            order: 4,
            completed: false
          },
          {
            id: "ch5",
            title: "디버깅 전략",
            duration: 900,
            videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
            order: 5,
            completed: false
          }
        ]
      },
      {
        id: "section3",
        title: "고급 활용법",
        order: 3,
        chapters: [
          {
            id: "ch6",
            title: "복잡한 프로젝트 관리",
            duration: 1100,
            videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
            order: 6,
            completed: false
          },
          {
            id: "ch7",
            title: "팀 협업에서의 바이브 코딩",
            duration: 700,
            videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
            order: 7,
            completed: false
          },
          {
            id: "ch8",
            title: "미래 전망과 준비",
            duration: 600,
            videoUrl: "https://www.youtube.com/watch?v=z4HfvrPA_kI",
            order: 8,
            completed: false
          }
        ]
      }
    ],
    enrolledAt: "2025-01-20T14:30:00Z",
    lastWatchedAt: "2025-01-22T16:45:00Z",
    lastWatchedChapterId: "ch3"
  }
];

export function getLectureById(id: string): Lecture | undefined {
  return dummyLectures.find(lecture => lecture.id === id);
}

export function getUserLectures(): Lecture[] {
  // 실제로는 사용자가 구매한 강의만 필터링해서 반환
  return dummyLectures;
}