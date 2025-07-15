"use client";

import { useState } from "react";
import { X, Upload, Calendar, DollarSign, BookOpen, Image as ImageIcon } from "lucide-react";
import Image from "next/image";

interface AddLectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lectureData: LectureFormData) => void;
}

interface LectureFormData {
  title: string;
  price: string;
  duration: string;
  startDate: string;
  endDate: string;
  thumbnail: File | null;
  thumbnailPreview: string;
}

export default function AddLectureModal({
  isOpen,
  onClose,
  onSubmit,
}: AddLectureModalProps) {
  const [formData, setFormData] = useState<LectureFormData>({
    title: "",
    price: "",
    duration: "",
    startDate: "",
    endDate: "",
    thumbnail: null,
    thumbnailPreview: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (field: keyof LectureFormData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // 에러 메시지 클리어
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ""
      }));
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // 파일 크기 체크 (5MB 제한)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          thumbnail: "파일 크기는 5MB 이하여야 합니다."
        }));
        return;
      }

      // 파일 형식 체크
      if (!file.type.startsWith('image/')) {
        setErrors(prev => ({
          ...prev,
          thumbnail: "이미지 파일만 업로드 가능합니다."
        }));
        return;
      }

      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData(prev => ({
          ...prev,
          thumbnail: file,
          thumbnailPreview: e.target?.result as string
        }));
      };
      reader.readAsDataURL(file);

      // 에러 메시지 클리어
      if (errors.thumbnail) {
        setErrors(prev => ({
          ...prev,
          thumbnail: ""
        }));
      }
    }
  };

  const handleRemoveThumbnail = () => {
    setFormData(prev => ({
      ...prev,
      thumbnail: null,
      thumbnailPreview: ""
    }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "강의 제목을 입력해주세요.";
    } else if (formData.title.length < 2) {
      newErrors.title = "강의 제목은 2자 이상 입력해주세요.";
    }

    if (!formData.price.trim()) {
      newErrors.price = "강의 가격을 입력해주세요.";
    }

    if (!formData.duration.trim()) {
      newErrors.duration = "강의 기간을 입력해주세요.";
    }

    if (!formData.startDate) {
      newErrors.startDate = "시작 날짜를 선택해주세요.";
    }

    if (!formData.endDate) {
      newErrors.endDate = "종료 날짜를 선택해주세요.";
    }

    if (formData.startDate && formData.endDate) {
      if (new Date(formData.startDate) >= new Date(formData.endDate)) {
        newErrors.endDate = "종료 날짜는 시작 날짜보다 이후여야 합니다.";
      }
    }

    if (!formData.thumbnail) {
      newErrors.thumbnail = "강의 썸네일을 업로드해주세요.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
      handleClose();
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      price: "",
      duration: "",
      startDate: "",
      endDate: "",
      thumbnail: null,
      thumbnailPreview: "",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-6 shadow-xl">
        {/* 헤더 */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">새 강의 추가</h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 썸네일 업로드 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <ImageIcon className="mr-2 inline h-4 w-4" />
              강의 썸네일 *
            </label>
            
            {!formData.thumbnailPreview ? (
              <div className="relative">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailChange}
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                />
                <div className="flex h-32 items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-gray-400 hover:bg-gray-100">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-400" />
                    <p className="mt-2 text-sm text-gray-600">
                      이미지를 클릭하여 업로드하세요
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF (최대 5MB)
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative">
                <Image
                  src={formData.thumbnailPreview}
                  alt="썸네일 미리보기"
                  width={600}
                  height={128}
                  className="h-32 w-full rounded-lg object-cover"
                />
                <button
                  type="button"
                  onClick={handleRemoveThumbnail}
                  className="absolute top-2 right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>
            )}
          </div>

          {/* 강의 제목 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <BookOpen className="mr-2 inline h-4 w-4" />
              강의 제목 *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="강의 제목을 입력하세요"
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-500">{errors.title}</p>
            )}
          </div>

          {/* 강의 가격 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <DollarSign className="mr-2 inline h-4 w-4" />
              강의 가격 *
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="예: 무료, 50,000원, $99"
            />
            {errors.price && (
              <p className="mt-1 text-sm text-red-500">{errors.price}</p>
            )}
          </div>

          {/* 강의 기간 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <Calendar className="mr-2 inline h-4 w-4" />
              강의 기간 *
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="예: 4주, 2개월, 6주간"
            />
            {errors.duration && (
              <p className="mt-1 text-sm text-red-500">{errors.duration}</p>
            )}
          </div>

          {/* 시작일 및 종료일 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                시작 날짜 *
              </label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              {errors.startDate && (
                <p className="mt-1 text-sm text-red-500">{errors.startDate}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                종료 날짜 *
              </label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              />
              {errors.endDate && (
                <p className="mt-1 text-sm text-red-500">{errors.endDate}</p>
              )}
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
            >
              강의 추가
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}