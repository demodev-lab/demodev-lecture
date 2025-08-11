"use client";

import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipForward, SkipBack } from "lucide-react";
import { lectureStore } from "@/utils/lectureStore";

interface VideoPlayerProps {
  videoUrl: string;
  chapterId: string;
  lectureId: string;
  onComplete?: () => void;
}

export default function VideoPlayer({ videoUrl, chapterId, lectureId, onComplete }: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSettings, setShowSettings] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const controlsTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const progressUpdateIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // YouTube URL을 임베드 URL로 변환
  const getEmbedUrl = (url: string) => {
    if (url.includes("youtube.com/watch")) {
      const videoId = new URL(url).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;
    } else if (url.includes("youtu.be")) {
      const videoId = url.split("/").pop();
      return `https://www.youtube.com/embed/${videoId}?enablejsapi=1&rel=0`;
    }
    return url;
  };

  // YouTube 비디오인지 확인
  const isYouTube = videoUrl.includes("youtube") || videoUrl.includes("youtu.be");

  useEffect(() => {
    const video = videoRef.current;
    
    if (video) {
      const handleLoadedMetadata = () => {
        setDuration(video.duration);
        
        // 이전 진도 불러오기
        const savedProgress = lectureStore.getChapterProgress(lectureId, chapterId);
        if (savedProgress && savedProgress.watchedSeconds > 0) {
          const resumeTime = Math.min(savedProgress.watchedSeconds, video.duration);
          video.currentTime = resumeTime;
          setCurrentTime(resumeTime);
          setProgress((resumeTime / video.duration) * 100);
        }
      };

      const handleTimeUpdate = () => {
        const current = video.currentTime;
        const videoDuration = video.duration;
        
        setCurrentTime(current);
        setProgress((current / videoDuration) * 100);

        // 90% 이상 시청 시 완료 처리
        if (current / videoDuration >= 0.9) {
          lectureStore.completeChapter(lectureId, chapterId, videoDuration);
          if (onComplete) {
            onComplete();
          }
        }
      };

      const handlePlay = () => {
        setIsPlaying(true);
        // 10초마다 진도 업데이트 (저장 부담 줄이기)
        progressUpdateIntervalRef.current = setInterval(() => {
          if (video.currentTime && video.duration) {
            lectureStore.updateChapterProgress(
              lectureId, 
              chapterId, 
              video.currentTime, 
              video.duration
            );
          }
        }, 10000); // 3초 -> 10초로 변경
      };

      const handlePause = () => {
        setIsPlaying(false);
        // 일시정지 시 진도 저장
        if (video.currentTime && video.duration) {
          lectureStore.updateChapterProgress(
            lectureId, 
            chapterId, 
            video.currentTime, 
            video.duration
          );
        }
        // 인터벌 클리어
        if (progressUpdateIntervalRef.current) {
          clearInterval(progressUpdateIntervalRef.current);
          progressUpdateIntervalRef.current = null;
        }
      };

      const handleSeeking = () => {
        // 시크 시 진도 업데이트
        if (video.currentTime && video.duration) {
          lectureStore.updateChapterProgress(
            lectureId, 
            chapterId, 
            video.currentTime, 
            video.duration
          );
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);
      video.addEventListener("play", handlePlay);
      video.addEventListener("pause", handlePause);
      video.addEventListener("seeked", handleSeeking);

      return () => {
        // 최종 진도 저장
        if (video.currentTime && video.duration) {
          lectureStore.updateChapterProgress(
            lectureId, 
            chapterId, 
            video.currentTime, 
            video.duration
          );
        }
        
        // 인터벌 클리어
        if (progressUpdateIntervalRef.current) {
          clearInterval(progressUpdateIntervalRef.current);
        }
        
        // 이벤트 리스너 제거
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
        video.removeEventListener("play", handlePlay);
        video.removeEventListener("pause", handlePause);
        video.removeEventListener("seeked", handleSeeking);
      };
    }
  }, [chapterId, lectureId, onComplete]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressBarRef.current && videoRef.current) {
      const rect = progressBarRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const percentage = x / rect.width;
      const newTime = percentage * duration;
      videoRef.current.currentTime = newTime;
      setCurrentTime(newTime);
      setProgress(percentage * 100);
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoRef.current.requestFullscreen();
      }
    }
  };

  const handlePlaybackRateChange = (rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
    setShowSettings(false);
  };

  const skipTime = (seconds: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime += seconds;
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const showControlsTemporarily = () => {
    setShowControls(true);
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    controlsTimeoutRef.current = setTimeout(() => {
      if (isPlaying) {
        setShowControls(false);
      }
    }, 3000);
  };

  if (isYouTube) {
    return (
      <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
        <iframe
          src={getEmbedUrl(videoUrl)}
          className="absolute top-0 left-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div
      className="relative bg-black group"
      onMouseMove={showControlsTemporarily}
      onMouseLeave={() => isPlaying && setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        src={videoUrl}
        onClick={handlePlayPause}
      />

      {/* 컨트롤 오버레이 */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/50 to-transparent transition-opacity duration-300 ${
          showControls ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* 중앙 재생/일시정지 버튼 */}
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={handlePlayPause}
            className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors"
          >
            {isPlaying ? (
              <Pause className="w-12 h-12 text-white" />
            ) : (
              <Play className="w-12 h-12 text-white" />
            )}
          </button>
        </div>

        {/* 하단 컨트롤 바 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2">
          {/* 진행 바 */}
          <div
            ref={progressBarRef}
            className="w-full h-1 bg-white/30 rounded-full cursor-pointer"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-blue-500 rounded-full relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full" />
            </div>
          </div>

          {/* 컨트롤 버튼들 */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button onClick={handlePlayPause} className="text-white hover:text-blue-300">
                {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
              </button>

              <button
                onClick={() => skipTime(-10)}
                className="text-white hover:text-blue-300"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={() => skipTime(10)}
                className="text-white hover:text-blue-300"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-2">
                <button onClick={toggleMute} className="text-white hover:text-blue-300">
                  {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={isMuted ? 0 : volume}
                  onChange={handleVolumeChange}
                  className="w-20 h-1 bg-white/30 rounded-full appearance-none cursor-pointer"
                />
              </div>

              <span className="text-white text-sm">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="text-white hover:text-blue-300"
                >
                  <Settings className="w-5 h-5" />
                </button>
                {showSettings && (
                  <div className="absolute bottom-full right-0 mb-2 bg-gray-800 rounded-lg p-2 min-w-[120px]">
                    <div className="text-white text-sm">
                      <p className="px-2 py-1 text-gray-400">재생 속도</p>
                      {[0.5, 0.75, 1, 1.25, 1.5, 2].map((rate) => (
                        <button
                          key={rate}
                          onClick={() => handlePlaybackRateChange(rate)}
                          className={`block w-full text-left px-2 py-1 hover:bg-gray-700 rounded ${
                            playbackRate === rate ? "text-blue-400" : ""
                          }`}
                        >
                          {rate}x
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={handleFullscreen}
                className="text-white hover:text-blue-300"
              >
                <Maximize className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}