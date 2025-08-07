/**
 * 비디오 진도 추적 시스템
 * 추후 DB 연동 시 활성화
 * 현재는 localStorage를 사용한 로컬 저장 방식
 */

interface VideoProgress {
  lectureId: number;
  videoId: string;
  currentTime: number;
  duration: number;
  progressPercentage: number;
  lastWatchedAt: string;
  isCompleted: boolean;
  watchedSegments: Array<{
    start: number;
    end: number;
  }>;
}

interface LectureProgress {
  lectureId: number;
  totalVideos: number;
  completedVideos: number;
  overallProgress: number;
  lastAccessedAt: string;
  videos: Record<string, VideoProgress>;
}

class VideoProgressTracker {
  private readonly STORAGE_KEY = 'demolearn_video_progress';
  private readonly COMPLETION_THRESHOLD = 0.9; // 90% 이상 시청 시 완료로 처리

  /**
   * 비디오 진도 저장
   * @param lectureId - 강의 ID
   * @param videoId - 비디오 ID
   * @param currentTime - 현재 재생 시간
   * @param duration - 전체 비디오 길이
   */
  public saveProgress(
    lectureId: number,
    videoId: string,
    currentTime: number,
    duration: number
  ): void {
    try {
      const progress = this.getProgressData();
      
      if (!progress[lectureId]) {
        progress[lectureId] = this.createLectureProgress(lectureId);
      }

      const videoProgress: VideoProgress = {
        lectureId,
        videoId,
        currentTime,
        duration,
        progressPercentage: (currentTime / duration) * 100,
        lastWatchedAt: new Date().toISOString(),
        isCompleted: (currentTime / duration) >= this.COMPLETION_THRESHOLD,
        watchedSegments: this.updateWatchedSegments(
          progress[lectureId].videos[videoId]?.watchedSegments || [],
          currentTime
        )
      };

      progress[lectureId].videos[videoId] = videoProgress;
      progress[lectureId].lastAccessedAt = new Date().toISOString();
      
      // 전체 진도율 계산
      this.updateLectureProgress(progress[lectureId]);

      this.saveToStorage(progress);
      
      // 디버그 로그 (개발 환경에서만)
      if (process.env.NODE_ENV === 'development') {
        console.log('Progress saved:', {
          lectureId,
          videoId,
          progress: videoProgress.progressPercentage.toFixed(2) + '%'
        });
      }
    } catch (error) {
      console.error('Failed to save video progress:', error);
    }
  }

  /**
   * 특정 비디오의 진도 가져오기
   */
  public getVideoProgress(lectureId: number, videoId: string): VideoProgress | null {
    const progress = this.getProgressData();
    return progress[lectureId]?.videos[videoId] || null;
  }

  /**
   * 강의 전체 진도 가져오기
   */
  public getLectureProgress(lectureId: number): LectureProgress | null {
    const progress = this.getProgressData();
    return progress[lectureId] || null;
  }

  /**
   * 모든 진도 데이터 가져오기
   */
  public getAllProgress(): Record<number, LectureProgress> {
    return this.getProgressData();
  }

  /**
   * 특정 비디오 진도 초기화
   */
  public resetVideoProgress(lectureId: number, videoId: string): void {
    const progress = this.getProgressData();
    if (progress[lectureId]?.videos[videoId]) {
      delete progress[lectureId].videos[videoId];
      this.updateLectureProgress(progress[lectureId]);
      this.saveToStorage(progress);
    }
  }

  /**
   * 특정 강의 진도 초기화
   */
  public resetLectureProgress(lectureId: number): void {
    const progress = this.getProgressData();
    if (progress[lectureId]) {
      delete progress[lectureId];
      this.saveToStorage(progress);
    }
  }

  /**
   * 모든 진도 초기화
   */
  public resetAllProgress(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.STORAGE_KEY);
    }
  }

  /**
   * 시청 완료 처리
   */
  public markAsCompleted(lectureId: number, videoId: string, duration: number): void {
    this.saveProgress(lectureId, videoId, duration, duration);
  }

  /**
   * 다음 시청할 비디오 추천
   */
  public getNextVideo(lectureId: number, currentVideoId: string): string | null {
    const lectureProgress = this.getLectureProgress(lectureId);
    if (!lectureProgress) return null;

    const videos = Object.keys(lectureProgress.videos);
    const currentIndex = videos.indexOf(currentVideoId);
    
    if (currentIndex === -1 || currentIndex === videos.length - 1) {
      return null;
    }

    return videos[currentIndex + 1];
  }

  /**
   * 진도율 통계
   */
  public getStatistics(): {
    totalLectures: number;
    completedLectures: number;
    inProgressLectures: number;
    totalWatchTime: number;
    averageProgress: number;
  } {
    const progress = this.getProgressData();
    const stats = {
      totalLectures: 0,
      completedLectures: 0,
      inProgressLectures: 0,
      totalWatchTime: 0,
      averageProgress: 0
    };

    const lectureIds = Object.keys(progress);
    stats.totalLectures = lectureIds.length;

    let totalProgress = 0;
    lectureIds.forEach(id => {
      const lecture = progress[Number(id)];
      if (lecture.overallProgress >= 90) {
        stats.completedLectures++;
      } else if (lecture.overallProgress > 0) {
        stats.inProgressLectures++;
      }

      Object.values(lecture.videos).forEach(video => {
        stats.totalWatchTime += video.currentTime;
      });

      totalProgress += lecture.overallProgress;
    });

    stats.averageProgress = stats.totalLectures > 0 
      ? totalProgress / stats.totalLectures 
      : 0;

    return stats;
  }

  // Private methods
  private getProgressData(): Record<number, LectureProgress> {
    if (typeof window === 'undefined') {
      return {};
    }

    try {
      const data = localStorage.getItem(this.STORAGE_KEY);
      return data ? JSON.parse(data) : {};
    } catch {
      return {};
    }
  }

  private saveToStorage(data: Record<number, LectureProgress>): void {
    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
      } catch (error) {
        console.error('Failed to save to localStorage:', error);
      }
    }
  }

  private createLectureProgress(lectureId: number): LectureProgress {
    return {
      lectureId,
      totalVideos: 0,
      completedVideos: 0,
      overallProgress: 0,
      lastAccessedAt: new Date().toISOString(),
      videos: {}
    };
  }

  private updateLectureProgress(lecture: LectureProgress): void {
    const videos = Object.values(lecture.videos);
    lecture.totalVideos = videos.length;
    lecture.completedVideos = videos.filter(v => v.isCompleted).length;
    
    if (videos.length > 0) {
      const totalProgress = videos.reduce(
        (sum, video) => sum + video.progressPercentage, 
        0
      );
      lecture.overallProgress = totalProgress / videos.length;
    } else {
      lecture.overallProgress = 0;
    }
  }

  private updateWatchedSegments(
    segments: Array<{ start: number; end: number }>,
    currentTime: number
  ): Array<{ start: number; end: number }> {
    const SEGMENT_THRESHOLD = 5; // 5초 간격으로 세그먼트 병합
    const newSegment = {
      start: Math.max(0, currentTime - SEGMENT_THRESHOLD),
      end: currentTime
    };

    // 기존 세그먼트와 병합
    const merged = [...segments];
    let added = false;

    for (let i = 0; i < merged.length; i++) {
      const segment = merged[i];
      if (
        newSegment.start <= segment.end + SEGMENT_THRESHOLD &&
        newSegment.end >= segment.start - SEGMENT_THRESHOLD
      ) {
        segment.start = Math.min(segment.start, newSegment.start);
        segment.end = Math.max(segment.end, newSegment.end);
        added = true;
        break;
      }
    }

    if (!added) {
      merged.push(newSegment);
    }

    // 세그먼트 정렬 및 중복 제거
    return merged.sort((a, b) => a.start - b.start);
  }
}

// 싱글톤 인스턴스 생성
const videoProgressTracker = new VideoProgressTracker();

// Export for use in components
export default videoProgressTracker;
export type { VideoProgress, LectureProgress };

/**
 * 사용 예시 (주석 처리된 코드):
 * 
 * // 컴포넌트에서 사용
 * import videoProgressTracker from '@/lib/video-progress-tracker';
 * 
 * // 비디오 플레이어 컴포넌트
 * function VideoPlayer({ lectureId, videoId }) {
 *   const videoRef = useRef<HTMLVideoElement>(null);
 *   
 *   // 진도 저장 (10초마다)
 *   useEffect(() => {
 *     const interval = setInterval(() => {
 *       if (videoRef.current && !videoRef.current.paused) {
 *         videoProgressTracker.saveProgress(
 *           lectureId,
 *           videoId,
 *           videoRef.current.currentTime,
 *           videoRef.current.duration
 *         );
 *       }
 *     }, 10000);
 *     
 *     return () => clearInterval(interval);
 *   }, [lectureId, videoId]);
 *   
 *   // 이전 진도 복원
 *   useEffect(() => {
 *     const progress = videoProgressTracker.getVideoProgress(lectureId, videoId);
 *     if (progress && videoRef.current) {
 *       videoRef.current.currentTime = progress.currentTime;
 *     }
 *   }, [lectureId, videoId]);
 *   
 *   // 비디오 종료 시 저장
 *   const handleVideoEnd = () => {
 *     if (videoRef.current) {
 *       videoProgressTracker.markAsCompleted(
 *         lectureId,
 *         videoId,
 *         videoRef.current.duration
 *       );
 *     }
 *   };
 *   
 *   return (
 *     <video
 *       ref={videoRef}
 *       onEnded={handleVideoEnd}
 *       onPause={() => {
 *         if (videoRef.current) {
 *           videoProgressTracker.saveProgress(
 *             lectureId,
 *             videoId,
 *             videoRef.current.currentTime,
 *             videoRef.current.duration
 *           );
 *         }
 *       }}
 *     />
 *   );
 * }
 * 
 * // 진도 표시 컴포넌트
 * function ProgressDisplay({ lectureId }) {
 *   const [progress, setProgress] = useState(null);
 *   
 *   useEffect(() => {
 *     const lectureProgress = videoProgressTracker.getLectureProgress(lectureId);
 *     setProgress(lectureProgress);
 *   }, [lectureId]);
 *   
 *   if (!progress) return null;
 *   
 *   return (
 *     <div>
 *       <div className="text-sm text-gray-600">
 *         진도율: {progress.overallProgress.toFixed(1)}%
 *       </div>
 *       <div className="text-sm text-gray-600">
 *         완료: {progress.completedVideos} / {progress.totalVideos}
 *       </div>
 *     </div>
 *   );
 * }
 * 
 * // 통계 대시보드
 * function LearningDashboard() {
 *   const stats = videoProgressTracker.getStatistics();
 *   
 *   return (
 *     <div className="grid grid-cols-4 gap-4">
 *       <div className="p-4 bg-white rounded-lg">
 *         <div className="text-2xl font-bold">{stats.totalLectures}</div>
 *         <div className="text-sm text-gray-600">전체 강의</div>
 *       </div>
 *       <div className="p-4 bg-white rounded-lg">
 *         <div className="text-2xl font-bold">{stats.completedLectures}</div>
 *         <div className="text-sm text-gray-600">완료한 강의</div>
 *       </div>
 *       <div className="p-4 bg-white rounded-lg">
 *         <div className="text-2xl font-bold">{stats.inProgressLectures}</div>
 *         <div className="text-sm text-gray-600">수강 중</div>
 *       </div>
 *       <div className="p-4 bg-white rounded-lg">
 *         <div className="text-2xl font-bold">
 *           {Math.floor(stats.totalWatchTime / 3600)}시간
 *         </div>
 *         <div className="text-sm text-gray-600">총 학습 시간</div>
 *       </div>
 *     </div>
 *   );
 * }
 */