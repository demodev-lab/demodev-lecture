import { Lecture } from "@/app/lecture/[id]/lectures";

// localStorage 키
const STORAGE_KEY = 'demolearn_lectures';

// 강의 데이터를 저장하는 스토어
class LectureStore {
  private lectures: Lecture[] = [];
  private listeners: Set<() => void> = new Set();

  constructor() {
    // 브라우저 환경에서만 localStorage 사용
    if (typeof window !== 'undefined') {
      this.loadFromLocalStorage();
    }
  }

  // localStorage에서 데이터 로드
  private loadFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        this.lectures = JSON.parse(saved);
      }
    } catch (error) {
      console.error('Failed to load lectures from localStorage:', error);
    }
  }

  // localStorage에 데이터 저장
  private saveToLocalStorage(): void {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.lectures));
      }
    } catch (error) {
      console.error('Failed to save lectures to localStorage:', error);
    }
  }

  // 강의 목록 가져오기
  getLectures(): Lecture[] {
    return [...this.lectures];
  }

  // 강의 추가
  addLecture(lectureData: {
    title: string;
    price: string;
    duration: string;
    startDate: string;
    endDate: string;
    category: string;
    subcategory: string;
    thumbnailUrl: string;
    videoUrl: string;
  }): Lecture {
    const newLecture: Lecture = {
      id: Date.now(),
      badge: this.getCategoryBadge(lectureData.category),
      title: lectureData.title,
      instructor: {
        name: "데모데브",
        bio: "AI 코딩 교육 전문가",
        avatar: "/instructor-avatar-1.jpg",
        experience: "5년",
        specialties: [lectureData.category, lectureData.subcategory],
      },
      description: `${lectureData.title} 강의입니다.`,
      detailedDescription: `${lectureData.title}에 대한 상세한 설명입니다.`,
      rating: null,
      reviews: null,
      category: lectureData.subcategory || lectureData.category,
      image: lectureData.thumbnailUrl,
      isNew: true,
      url: lectureData.videoUrl,
      duration: lectureData.duration,
      level: "beginner",
      language: "한국어",
      lastUpdated: new Date().toLocaleDateString('ko-KR'),
      enrolledStudents: 0,
      price: {
        original: this.parsePrice(lectureData.price),
        currency: "KRW",
      },
      learningOutcomes: [`${lectureData.title} 마스터하기`],
      prerequisites: ["기본적인 컴퓨터 사용 능력"],
      tags: [lectureData.category, lectureData.subcategory],
      chapters: [
        {
          id: 1,
          title: `${lectureData.title} 소개`,
          duration: "20분",
          videoUrl: lectureData.videoUrl,
          description: `${lectureData.title}에 대한 기본 소개`,
          isFree: true,
        }
      ],
      certificateProvided: true,
      hasSubtitles: false,
      supportedDevices: ["PC", "모바일", "태블릿"],
    };

    this.lectures.unshift(newLecture);
    this.saveToLocalStorage(); // localStorage에 저장
    this.notifyListeners();
    return newLecture;
  }

  // 카테고리에 따른 배지 결정
  private getCategoryBadge(category: string): string {
    const badgeMap: Record<string, string> = {
      "오리지널": "ORIGINAL",
      "바이브 코딩": "VIBE",
      "앱/웹": "DEV",
      "자동화": "AUTO"
    };
    return badgeMap[category] || "NEW";
  }

  // 가격 문자열 파싱
  private parsePrice(priceStr: string): number {
    if (priceStr === "무료" || priceStr.toLowerCase() === "free") {
      return 0;
    }
    const numbers = priceStr.replace(/[^0-9]/g, '');
    return parseInt(numbers) || 0;
  }

  // 리스너 등록
  subscribe(listener: () => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  // 리스너에게 변경 알림
  private notifyListeners(): void {
    this.listeners.forEach(listener => listener());
  }

  // 강의 수정
  updateLecture(id: number, updateData: Partial<{
    title: string;
    price: string;
    duration: string;
    category: string;
    subcategory: string;
    thumbnailUrl: string;
    videoUrl: string;
  }>): boolean {
    const index = this.lectures.findIndex(lecture => lecture.id === id);
    if (index === -1) return false;

    const existingLecture = this.lectures[index];
    
    // 업데이트할 데이터 적용
    if (updateData.title) {
      existingLecture.title = updateData.title;
      existingLecture.description = `${updateData.title} 강의입니다.`;
    }
    if (updateData.category || updateData.subcategory) {
      existingLecture.category = updateData.subcategory || updateData.category || existingLecture.category;
      existingLecture.badge = this.getCategoryBadge(updateData.category || "");
      existingLecture.tags = [updateData.category || "", updateData.subcategory || ""].filter(Boolean);
    }
    if (updateData.duration) {
      existingLecture.duration = updateData.duration;
    }
    if (updateData.price) {
      existingLecture.price.original = this.parsePrice(updateData.price);
    }
    if (updateData.thumbnailUrl) {
      existingLecture.image = updateData.thumbnailUrl;
    }
    if (updateData.videoUrl) {
      existingLecture.url = updateData.videoUrl;
      // 첫 번째 챕터의 비디오 URL도 업데이트
      if (existingLecture.chapters.length > 0) {
        existingLecture.chapters[0].videoUrl = updateData.videoUrl;
      }
    }
    existingLecture.lastUpdated = new Date().toLocaleDateString('ko-KR');

    this.saveToLocalStorage(); // localStorage에 저장
    this.notifyListeners();
    return true;
  }

  // 강의 삭제
  deleteLecture(id: number): boolean {
    const index = this.lectures.findIndex(lecture => lecture.id === id);
    if (index === -1) return false;

    this.lectures.splice(index, 1);
    this.saveToLocalStorage(); // localStorage에 저장
    this.notifyListeners();
    return true;
  }

  // ID로 강의 찾기
  getLectureById(id: number): Lecture | undefined {
    return this.lectures.find(lecture => lecture.id === id);
  }

  // 카테고리별 강의 필터링
  getLecturesByCategory(category?: string, subcategory?: string): Lecture[] {
    let filtered = this.getLectures();

    if (subcategory) {
      filtered = filtered.filter(lecture => lecture.category === subcategory);
    } else if (category) {
      // 카테고리의 모든 하위 카테고리 포함
      const categoryMap: Record<string, string[]> = {
        "오리지널": ["바이브 빌더스"],
        "바이브 코딩": ["프롬프트 엔지니어링", "컨텍스트 엔지니어링", "AI 도구 활용"],
        "앱/웹": ["앱 바이브 코딩 입문", "웹 바이브 코딩 입문", "앱 수익화", "웹 수익화"],
        "자동화": ["n8n", "Make", "PyTorch", "크롤링", "AI 업무 자동화"]
      };
      
      const subcategories = categoryMap[category] || [];
      filtered = filtered.filter(lecture => 
        subcategories.includes(lecture.category) || lecture.category === category
      );
    }

    return filtered;
  }
}

// 싱글톤 인스턴스
export const lectureStore = new LectureStore();