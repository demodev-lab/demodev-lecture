import { Lecture } from "@/app/lecture/[id]/lectures";
import { ChapterProgress, LectureProgress } from "@/types/lecture";

// localStorage 키
const STORAGE_KEY = 'demolearn_lectures';
const PROGRESS_KEY = 'demolearn_progress';

// 강의 데이터를 저장하는 스토어
class LectureStore {
  private lectures: Lecture[] = [];
  private progress: Map<string, Map<string, ChapterProgress>> = new Map(); // lectureId -> chapterId -> progress
  private listeners: Set<() => void> = new Set();
  private isInitialized: boolean = false;
  private lastSaveTime: number = 0;
  private saveThrottle: number = 5000; // 5초 throttling

  constructor() {
    if (typeof window !== 'undefined') {
      this.loadFromLocalStorage();
      this.loadProgressFromLocalStorage();
      this.isInitialized = true;
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

  // localStorage에 데이터 저장 (용량 최적화)
  private saveToLocalStorage(): void {
    try {
      if (typeof window !== 'undefined') {
        // Base64 데이터를 제거한 경량화된 버전 저장
        const lightweightLectures = this.lectures.map(lecture => ({
          ...lecture,
          // Base64 데이터는 저장하지 않음 (용량 절약)
          videoUrl: lecture.videoUrl?.startsWith('data:') ? '[BASE64_VIDEO_DATA]' : lecture.videoUrl,
          thumbnailUrl: lecture.thumbnailUrl?.startsWith('data:') ? '[BASE64_IMAGE_DATA]' : lecture.thumbnailUrl,
          image: lecture.image?.startsWith('data:') ? '[BASE64_IMAGE_DATA]' : lecture.image,
          chapters: lecture.chapters?.map(chapter => ({
            ...chapter,
            videoUrl: chapter.videoUrl?.startsWith('data:') ? '[BASE64_VIDEO_DATA]' : chapter.videoUrl
          })) || []
        }));
        
        const dataString = JSON.stringify(lightweightLectures);
        
        // 용량 체크 (5MB 제한)
        const sizeInMB = new Blob([dataString]).size / 1024 / 1024;
        if (sizeInMB > 5) {
          console.warn(`Data size (${sizeInMB.toFixed(2)}MB) exceeds 5MB limit. Skipping localStorage save.`);
          return;
        }
        
        localStorage.setItem(STORAGE_KEY, dataString);
      }
    } catch (error) {
      if (error instanceof DOMException && error.code === 22) {
        // QuotaExceededError
        console.error('localStorage quota exceeded. Clearing old data and retrying...');
        this.clearOldData();
      } else {
        console.error('Failed to save lectures to localStorage:', error);
      }
    }
  }

  // 오래된 데이터 정리
  private clearOldData(): void {
    try {
      // 진도 데이터만 유지하고 강의 데이터는 정리
      const progressData = localStorage.getItem(PROGRESS_KEY);
      localStorage.clear();
      if (progressData) {
        localStorage.setItem(PROGRESS_KEY, progressData);
      }
      console.log('Cleared old localStorage data, keeping progress data');
    } catch (error) {
      console.error('Failed to clear old data:', error);
    }
  }

  // 강의 목록 가져오기
  getLectures(): Lecture[] {
    // 초기화되지 않았다면 강제로 로드
    if (!this.isInitialized && typeof window !== 'undefined') {
      this.loadFromLocalStorage();
      this.isInitialized = true;
    }
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
      category: lectureData.category,
      subcategory: lectureData.subcategory,
      image: lectureData.thumbnailUrl, // Base64 직접 저장
      thumbnailUrl: lectureData.thumbnailUrl, // Base64 직접 저장
      isNew: true,
      url: lectureData.videoUrl, // Base64 직접 저장
      videoUrl: lectureData.videoUrl, // Base64 직접 저장
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
          videoUrl: lectureData.videoUrl, // Base64 직접 저장
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
      existingLecture.category = updateData.category || existingLecture.category;
      existingLecture.subcategory = updateData.subcategory;
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
      existingLecture.thumbnailUrl = updateData.thumbnailUrl;
    }
    if (updateData.videoUrl) {
      existingLecture.url = updateData.videoUrl;
      existingLecture.videoUrl = updateData.videoUrl;
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
      filtered = filtered.filter(lecture => lecture.subcategory === subcategory);
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
        subcategories.includes(lecture.subcategory || '') || lecture.category === category
      );
    }

    return filtered;
  }

  // 진도 관련 메서드들

  // localStorage에서 진도 로드
  private loadProgressFromLocalStorage(): void {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY);
      if (saved) {
        const progressData = JSON.parse(saved);
        this.progress = new Map();
        
        for (const [lectureId, chapterProgressMap] of Object.entries(progressData)) {
          const chapterMap = new Map<string, ChapterProgress>();
          for (const [chapterId, progress] of Object.entries(chapterProgressMap as Record<string, ChapterProgress>)) {
            chapterMap.set(chapterId, progress);
          }
          this.progress.set(lectureId, chapterMap);
        }
      }
    } catch (error) {
      console.error('진도 데이터 로드 실패:', error);
      this.progress = new Map();
    }
  }

  // throttled 진도 저장
  private saveProgressThrottled(): void {
    const now = Date.now();
    if (now - this.lastSaveTime < this.saveThrottle) {
      return; // throttling
    }
    this.lastSaveTime = now;
    this.saveProgressToLocalStorage();
  }

  // 진도를 localStorage에 저장 (용량 최적화)
  private saveProgressToLocalStorage(): void {
    try {
      const progressData: Record<string, Record<string, ChapterProgress>> = {};
      
      for (const [lectureId, chapterMap] of this.progress.entries()) {
        progressData[lectureId] = {};
        for (const [chapterId, progress] of chapterMap.entries()) {
          progressData[lectureId][chapterId] = progress;
        }
      }
      
      const dataString = JSON.stringify(progressData);
      
      // 용량 체크 (2MB 제한)
      const sizeInMB = new Blob([dataString]).size / 1024 / 1024;
      if (sizeInMB > 2) {
        console.warn(`Progress data size (${sizeInMB.toFixed(2)}MB) exceeds 2MB limit. Cleaning old data...`);
        this.cleanOldProgressData();
        return;
      }
      
      localStorage.setItem(PROGRESS_KEY, dataString);
    } catch (error) {
      if (error instanceof DOMException && error.code === 22) {
        console.error('localStorage quota exceeded for progress data. Cleaning old data...');
        this.cleanOldProgressData();
      } else {
        console.error('진도 데이터 저장 실패:', error);
      }
    }
  }

  // 오래된 진도 데이터 정리 (30일 이상 된 데이터 삭제)
  private cleanOldProgressData(): void {
    try {
      const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
      let cleaned = false;

      for (const [lectureId, chapterMap] of this.progress.entries()) {
        for (const [chapterId, progress] of chapterMap.entries()) {
          const lastWatched = new Date(progress.lastWatchedAt);
          if (lastWatched < thirtyDaysAgo) {
            chapterMap.delete(chapterId);
            cleaned = true;
          }
        }
        // 빈 강의 맵 제거
        if (chapterMap.size === 0) {
          this.progress.delete(lectureId);
        }
      }

      if (cleaned) {
        console.log('Cleaned old progress data (30+ days old)');
        // 정리 후 다시 저장 시도
        const progressData: Record<string, Record<string, ChapterProgress>> = {};
        
        for (const [lectureId, chapterMap] of this.progress.entries()) {
          progressData[lectureId] = {};
          for (const [chapterId, progress] of chapterMap.entries()) {
            progressData[lectureId][chapterId] = progress;
          }
        }
        
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(progressData));
      }
    } catch (error) {
      console.error('Failed to clean old progress data:', error);
    }
  }

  // 챕터 진도 업데이트
  updateChapterProgress(lectureId: string, chapterId: string, watchedSeconds: number, totalDuration: number): void {
    if (!this.progress.has(lectureId)) {
      this.progress.set(lectureId, new Map());
    }
    
    const lectureProgress = this.progress.get(lectureId)!;
    const progressPercentage = Math.min(100, (watchedSeconds / totalDuration) * 100);
    const completed = progressPercentage >= 90; // 90% 이상 시청 시 완료

    const chapterProgress: ChapterProgress = {
      chapterId,
      watchedSeconds: Math.min(watchedSeconds, totalDuration),
      totalDuration,
      completed,
      progressPercentage,
      lastWatchedAt: new Date().toISOString(),
    };

    lectureProgress.set(chapterId, chapterProgress);
    this.saveProgressThrottled(); // throttled 저장 사용
    this.updateLectureOverallProgress(lectureId);
    this.notifyListeners();
  }

  // 강의 전체 진도율 업데이트
  private updateLectureOverallProgress(lectureId: string): void {
    const lecture = this.lectures.find(l => l.id.toString() === lectureId);
    if (!lecture) return;

    const lectureProgress = this.progress.get(lectureId);
    if (!lectureProgress) return;

    // 스토어에서는 chapters 배열을 기준으로 계산
    const totalChapters = lecture.chapters?.length || 0;
    let completedChapters = 0;

    if (lecture.chapters) {
      lecture.chapters.forEach(chapter => {
        const progress = lectureProgress.get(chapter.id.toString());
        if (progress?.completed) {
          completedChapters++;
        }
      });
    }

    // 마지막 시청 정보 업데이트
    const lastWatchedProgress = Array.from(lectureProgress.values())
      .sort((a, b) => new Date(b.lastWatchedAt).getTime() - new Date(a.lastWatchedAt).getTime())[0];
    
    if (lastWatchedProgress) {
      // 임시로 강의에 progress 정보 추가 (필요시 별도 저장)
      (lecture as any).lastWatchedChapterId = lastWatchedProgress.chapterId;
      (lecture as any).lastWatchedAt = lastWatchedProgress.lastWatchedAt;
      (lecture as any).completedChapters = completedChapters;
      (lecture as any).totalChapters = totalChapters;
      (lecture as any).progress = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
    }

    this.saveToLocalStorage();
  }

  // 챕터 진도 가져오기
  getChapterProgress(lectureId: string, chapterId: string): ChapterProgress | undefined {
    const lectureProgress = this.progress.get(lectureId);
    return lectureProgress?.get(chapterId);
  }

  // 강의 전체 진도 가져오기
  getLectureProgress(lectureId: string): Map<string, ChapterProgress> | undefined {
    return this.progress.get(lectureId);
  }

  // 챕터 완료 처리 (즉시 저장)
  completeChapter(lectureId: string, chapterId: string, totalDuration: number): void {
    this.updateChapterProgress(lectureId, chapterId, totalDuration, totalDuration);
    // 완료는 중요한 이벤트이므로 즉시 저장
    this.saveProgressToLocalStorage();
  }

  // 진도율 계산 유틸리티
  calculateOverallProgress(lectureId: string): { percentage: number; completedChapters: number; totalChapters: number } {
    const lecture = this.lectures.find(l => l.id.toString() === lectureId);
    if (!lecture) {
      return { percentage: 0, completedChapters: 0, totalChapters: 0 };
    }

    const totalChapters = lecture.chapters?.length || 0;
    const lectureProgress = this.progress.get(lectureId);
    
    if (!lectureProgress) {
      return { percentage: 0, completedChapters: 0, totalChapters };
    }

    let completedChapters = 0;
    if (lecture.chapters) {
      lecture.chapters.forEach(chapter => {
        const progress = lectureProgress.get(chapter.id.toString());
        if (progress?.completed) {
          completedChapters++;
        }
      });
    }

    const percentage = totalChapters > 0 ? Math.round((completedChapters / totalChapters) * 100) : 0;
    return { percentage, completedChapters, totalChapters };
  }
}

// 싱글톤 인스턴스
export const lectureStore = new LectureStore();