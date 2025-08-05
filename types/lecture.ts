export interface LectureChapter {
  id: string;
  title: string;
  duration: number; // seconds
  videoUrl?: string;
  order: number;
  completed: boolean;
}

export interface LectureSection {
  id: string;
  title: string;
  chapters: LectureChapter[];
  order: number;
}

export interface Lecture {
  id: string;
  title: string;
  subtitle?: string;
  instructor: string;
  description: string;
  thumbnail: string;
  badge: string;
  category: string;
  totalDuration: number; // seconds
  totalChapters: number;
  completedChapters: number;
  progress: number; // 0-100
  sections: LectureSection[];
  rating?: number;
  reviewCount?: number;
  enrolledAt?: string;
  lastWatchedAt?: string;
  lastWatchedChapterId?: string;
}

export interface LectureProgress {
  lectureId: string;
  chapterId: string;
  watchedSeconds: number;
  completed: boolean;
  lastUpdated: string;
}