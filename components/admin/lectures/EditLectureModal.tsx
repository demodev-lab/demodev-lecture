"use client";

import { useState, useEffect } from "react";
import { X, Calendar, DollarSign, BookOpen, Image as ImageIcon, Loader2, Video, Tag } from "lucide-react";
import { uploadLectureThumbnail, validateImageFile, uploadLectureVideo, validateVideoFile, createStorageBucket } from "@/utils/supabase/storage";

interface EditLectureModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lectureData: LectureFormData) => void;
  lectureData?: {
    id: string;
    title: string;
    category: string;
    price?: string;
    duration?: string;
  };
}

interface LectureFormData {
  id?: string;
  title: string;
  price: string;
  duration: string;
  category: string;
  subcategory: string;
  thumbnailUrl: string;
  videoUrl: string;
}

export default function EditLectureModal({
  isOpen,
  onClose,
  onSubmit,
  lectureData,
}: EditLectureModalProps) {
  const [formData, setFormData] = useState<LectureFormData>({
    id: "",
    title: "",
    price: "",
    duration: "",
    category: "",
    subcategory: "",
    thumbnailUrl: "",
    videoUrl: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isUploading, setIsUploading] = useState(false);
  const [isVideoUploading, setIsVideoUploading] = useState(false);

  // 카테고리 데이터
  const categories = {
    "오리지널": ["바이브 빌더스"],
    "바이브 코딩": ["프롬프트 엔지니어링", "컨텍스트 엔지니어링", "AI 도구 활용"],
    "앱/웹": ["앱 바이브 코딩 입문", "웹 바이브 코딩 입문", "앱 수익화", "웹 수익화"],
    "자동화": ["n8n", "Make", "PyTorch", "크롤링", "AI 업무 자동화"]
  };

  // 강의 데이터로 폼 초기화
  useEffect(() => {
    if (lectureData && isOpen) {
      // 카테고리 파싱
      let mainCategory = "";
      let subCategory = lectureData.category;
      
      // 카테고리 찾기
      for (const [cat, subs] of Object.entries(categories)) {
        if (subs.includes(lectureData.category)) {
          mainCategory = cat;
          subCategory = lectureData.category;
          break;
        }
      }

      setFormData({
        id: lectureData.id,
        title: lectureData.title,
        price: lectureData.price || "0",
        duration: lectureData.duration || "",
        category: mainCategory,
        subcategory: subCategory,
        thumbnailUrl: "",
        videoUrl: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lectureData, isOpen]);

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

  const handleThumbnailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    const validation = validateImageFile(file);
    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        thumbnail: validation.error || "잘못된 파일입니다."
      }));
      return;
    }

    setIsUploading(true);
    try {
      await createStorageBucket();
      const thumbnailUrl = await uploadLectureThumbnail(file, formData.title || 'lecture');
      
      setFormData(prev => ({
        ...prev,
        thumbnailUrl
      }));
    } catch (error) {
      console.error('업로드 실패:', error);
      setErrors(prev => ({
        ...prev,
        thumbnail: error instanceof Error ? error.message : "업로드에 실패했습니다."
      }));
    } finally {
      setIsUploading(false);
    }
  };

  const handleVideoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 유효성 검사
    const validation = validateVideoFile(file);
    if (!validation.isValid) {
      setErrors(prev => ({
        ...prev,
        video: validation.error || "잘못된 비디오 파일입니다."
      }));
      return;
    }

    setIsVideoUploading(true);
    try {
      await createStorageBucket();
      const videoUploadUrl = await uploadLectureVideo(file, formData.title || 'lecture');
      
      setFormData(prev => ({
        ...prev,
        videoUrl: videoUploadUrl
      }));
    } catch (error) {
      console.error('비디오 업로드 실패:', error);
      setErrors(prev => ({
        ...prev,
        video: error instanceof Error ? error.message : "비디오 업로드에 실패했습니다."
      }));
    } finally {
      setIsVideoUploading(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "강의 제목을 입력해주세요.";
    }

    if (!formData.category) {
      newErrors.category = "카테고리를 선택해주세요.";
    }

    if (!formData.subcategory) {
      newErrors.subcategory = "세부 카테고리를 선택해주세요.";
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
      id: "",
      title: "",
      price: "",
      duration: "",
      category: "",
      subcategory: "",
      thumbnailUrl: "",
      videoUrl: "",
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
          <h2 className="text-xl font-bold text-gray-900">강의 수정</h2>
          <button
            onClick={handleClose}
            className="rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 카테고리 선택 */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                <Tag className="mr-2 inline h-4 w-4" />
                카테고리 *
              </label>
              <select
                value={formData.category}
                onChange={(e) => {
                  handleInputChange("category", e.target.value);
                  handleInputChange("subcategory", "");
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              >
                <option value="">카테고리 선택</option>
                {Object.keys(categories).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-sm text-red-500">{errors.category}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700">
                세부 카테고리 *
              </label>
              <select
                value={formData.subcategory}
                onChange={(e) => handleInputChange("subcategory", e.target.value)}
                disabled={!formData.category}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none disabled:bg-gray-100 disabled:cursor-not-allowed"
              >
                <option value="">세부 카테고리 선택</option>
                {formData.category && categories[formData.category as keyof typeof categories]?.map((subcategory) => (
                  <option key={subcategory} value={subcategory}>
                    {subcategory}
                  </option>
                ))}
              </select>
              {errors.subcategory && (
                <p className="mt-1 text-sm text-red-500">{errors.subcategory}</p>
              )}
            </div>
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
              강의 가격
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={(e) => handleInputChange("price", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="예: 무료, 50,000원, $99"
            />
          </div>

          {/* 강의 기간 */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <Calendar className="mr-2 inline h-4 w-4" />
              강의 기간
            </label>
            <input
              type="text"
              value={formData.duration}
              onChange={(e) => handleInputChange("duration", e.target.value)}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
              placeholder="예: 4주, 2개월, 6주간"
            />
          </div>

          {/* 썸네일 업로드 (선택) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <ImageIcon className="mr-2 inline h-4 w-4" />
              새 썸네일 업로드 (선택)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleThumbnailChange}
                disabled={isUploading}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              {isUploading && (
                <div className="mt-2 flex items-center text-blue-600">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  업로드 중...
                </div>
              )}
              {formData.thumbnailUrl && (
                <div className="mt-2 text-sm text-green-600">
                  썸네일 업로드 완료
                </div>
              )}
            </div>
            {errors.thumbnail && (
              <p className="mt-1 text-sm text-red-500">{errors.thumbnail}</p>
            )}
          </div>

          {/* 비디오 업로드 (선택) */}
          <div>
            <label className="mb-2 block text-sm font-medium text-gray-700">
              <Video className="mr-2 inline h-4 w-4" />
              새 영상 업로드 (선택)
            </label>
            <div className="relative">
              <input
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
                disabled={isVideoUploading}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm"
              />
              {isVideoUploading && (
                <div className="mt-2 flex items-center text-blue-600">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  비디오 업로드 중...
                </div>
              )}
              {formData.videoUrl && (
                <div className="mt-2 text-sm text-green-600">
                  비디오 업로드 완료
                </div>
              )}
            </div>
            {errors.video && (
              <p className="mt-1 text-sm text-red-500">{errors.video}</p>
            )}
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
              수정하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}