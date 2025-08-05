"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Lecture } from "@/app/lecture/[id]/lectures";

interface FavoriteLecturesContextType {
  favoriteLectures: Lecture[];
  addToFavorites: (lecture: Lecture) => void;
  removeFromFavorites: (lectureId: number) => void;
  isFavorite: (lectureId: number) => boolean;
  toggleFavorite: (lecture: Lecture) => void;
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

  const removeFromFavorites = (lectureId: number) => {
    setFavoriteLectures(prev => prev.filter(lecture => lecture.id !== lectureId));
  };

  const isFavorite = (lectureId: number) => {
    return favoriteLectures.some(lecture => lecture.id === lectureId);
  };

  const toggleFavorite = (lecture: Lecture) => {
    if (isFavorite(lecture.id)) {
      removeFromFavorites(lecture.id);
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