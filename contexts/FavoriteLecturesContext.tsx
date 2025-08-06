"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lecture } from "@/app/lecture/[id]/lectures";

interface FavoriteLecturesContextType {
  favoriteLectures: Lecture[];
  addToFavorites: (lecture: Lecture) => void;
  removeFromFavorites: (lectureId: number, type?: 'course' | 'challenge') => void;
  isFavorite: (lectureId: number, type?: 'course' | 'challenge') => boolean;
  toggleFavorite: (lecture: Lecture, type?: 'course' | 'challenge') => void;
}

const FavoriteLecturesContext = createContext<FavoriteLecturesContextType | undefined>(undefined);

interface FavoriteLecturesProviderProps {
  children: ReactNode;
}

export function FavoriteLecturesProvider({ children }: FavoriteLecturesProviderProps) {
  const [favoriteLectures, setFavoriteLectures] = useState<Lecture[]>([]);

  // localStorage에서 관심 강의 불러오기
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favoriteLectures");
    if (savedFavorites) {
      try {
        setFavoriteLectures(JSON.parse(savedFavorites));
      } catch (error) {
        console.error("Failed to parse favorite lectures:", error);
      }
    }
  }, []);

  // localStorage에 관심 강의 저장
  useEffect(() => {
    localStorage.setItem("favoriteLectures", JSON.stringify(favoriteLectures));
  }, [favoriteLectures]);

  const addToFavorites = (lecture: Lecture) => {
    setFavoriteLectures(prev => {
      const exists = prev.some(fav => fav.id === lecture.id);
      if (!exists) {
        return [...prev, lecture];
      }
      return prev;
    });
  };

  const removeFromFavorites = (lectureId: number, type?: 'course' | 'challenge') => {
    setFavoriteLectures(prev => prev.filter(lecture => {
      if (type) {
        // type이 지정된 경우, 해당 타입의 강의만 필터링
        const isChallenge = lecture.url.includes('latpeed.com');
        if (type === 'challenge' && isChallenge) return false;
        if (type === 'course' && !isChallenge) return false;
      }
      return lecture.id !== lectureId;
    }));
  };

  const isFavorite = (lectureId: number, type?: 'course' | 'challenge') => {
    return favoriteLectures.some(lecture => {
      if (lecture.id !== lectureId) return false;
      if (type) {
        // type이 지정된 경우, 해당 타입의 강의만 확인
        const isChallenge = lecture.url.includes('latpeed.com');
        if (type === 'challenge' && isChallenge) return true;
        if (type === 'course' && !isChallenge) return true;
        return false;
      }
      return true;
    });
  };

  const toggleFavorite = (lecture: Lecture, type?: 'course' | 'challenge') => {
    if (isFavorite(lecture.id, type)) {
      removeFromFavorites(lecture.id, type);
    } else {
      addToFavorites(lecture);
    }
  };

  const value = {
    favoriteLectures,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoriteLecturesContext.Provider value={value}>
      {children}
    </FavoriteLecturesContext.Provider>
  );
}

export function useFavoriteLectures() {
  const context = useContext(FavoriteLecturesContext);
  if (context === undefined) {
    throw new Error("useFavoriteLectures must be used within a FavoriteLecturesProvider");
  }
  return context;
} 