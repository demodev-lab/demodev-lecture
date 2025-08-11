import { createClient } from './client';

const THUMBNAIL_BUCKET_NAME = 'lecture-thumbnails';
const VIDEO_BUCKET_NAME = 'lecture-videos';

export async function uploadLectureThumbnail(file: File, fileName?: string): Promise<string> {
  // 실제 Supabase 업로드 대신 로컬 blob URL 반환
  // 나중에 Supabase Storage가 설정되면 아래 주석을 해제하고 사용
  
  /*
  const supabase = createClient();
  
  // 파일명 생성 (타임스탬프 + 원본 파일명)
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop();
  const uploadFileName = fileName 
    ? `${fileName}-${timestamp}.${fileExtension}`
    : `lecture-${timestamp}.${fileExtension}`;

  // 파일 업로드
  const { data, error } = await supabase.storage
    .from(THUMBNAIL_BUCKET_NAME)
    .upload(`thumbnails/${uploadFileName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`업로드 실패: ${error.message}`);
  }

  // 공개 URL 생성
  const { data: urlData } = supabase.storage
    .from(THUMBNAIL_BUCKET_NAME)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
  */

  // 임시로 blob URL 생성하여 반환
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}

export async function deleteLectureThumbnail(filePath: string): Promise<void> {
  const supabase = createClient();
  
  // URL에서 파일 경로 추출
  const pathParts = filePath.split(`/${THUMBNAIL_BUCKET_NAME}/`);
  const relativePath = pathParts[pathParts.length - 1];

  const { error } = await supabase.storage
    .from(THUMBNAIL_BUCKET_NAME)
    .remove([relativePath]);

  if (error) {
    throw new Error(`삭제 실패: ${error.message}`);
  }
}

export async function createStorageBucket(): Promise<void> {
  // 로컬 처리로 변경했으므로 버킷 생성 불필요
  // 나중에 Supabase Storage 사용 시 주석 해제
  
  /*
  const supabase = createClient();
  
  // 썸네일 버킷 확인 및 생성
  const { data: buckets } = await supabase.storage.listBuckets();
  const thumbnailBucketExists = buckets?.some(bucket => bucket.name === THUMBNAIL_BUCKET_NAME);
  const videoBucketExists = buckets?.some(bucket => bucket.name === VIDEO_BUCKET_NAME);

  if (!thumbnailBucketExists) {
    const { error } = await supabase.storage.createBucket(THUMBNAIL_BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
    });

    if (error) {
      console.warn(`썸네일 버킷 생성 실패: ${error.message}`);
    }
  }

  if (!videoBucketExists) {
    const { error } = await supabase.storage.createBucket(VIDEO_BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'],
      fileSizeLimit: 500 * 1024 * 1024, // 500MB
    });

    if (error) {
      console.warn(`비디오 버킷 생성 실패: ${error.message}`);
    }
  }
  */
  
  return Promise.resolve();
}

// 이미지 파일 유효성 검사
export function validateImageFile(file: File): { isValid: boolean; error?: string } {
  // 파일 크기 체크 (5MB)
  if (file.size > 5 * 1024 * 1024) {
    return { isValid: false, error: '파일 크기는 5MB 이하여야 합니다.' };
  }

  // 파일 타입 체크
  const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'JPEG, PNG, WebP, GIF 파일만 업로드 가능합니다.' };
  }

  return { isValid: true };
}

// 비디오 업로드 함수
export async function uploadLectureVideo(file: File, fileName?: string): Promise<string> {
  // 실제 Supabase 업로드 대신 로컬 blob URL 반환
  // 나중에 Supabase Storage가 설정되면 아래 주석을 해제하고 사용
  
  /*
  const supabase = createClient();
  
  // 파일명 생성 (타임스탬프 + 원본 파일명)
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop();
  const uploadFileName = fileName 
    ? `${fileName}-${timestamp}.${fileExtension}`
    : `lecture-video-${timestamp}.${fileExtension}`;

  // 파일 업로드
  const { data, error } = await supabase.storage
    .from(VIDEO_BUCKET_NAME)
    .upload(`videos/${uploadFileName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`비디오 업로드 실패: ${error.message}`);
  }

  // 공개 URL 생성
  const { data: urlData } = supabase.storage
    .from(VIDEO_BUCKET_NAME)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
  */

  // 임시로 blob URL 생성하여 반환
  const blobUrl = URL.createObjectURL(file);
  return blobUrl;
}

// 비디오 파일 유효성 검사
export function validateVideoFile(file: File): { isValid: boolean; error?: string } {
  // 파일 크기 체크 (500MB)
  if (file.size > 500 * 1024 * 1024) {
    return { isValid: false, error: '비디오 파일 크기는 500MB 이하여야 합니다.' };
  }

  // 파일 타입 체크
  const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg', 'video/avi', 'video/mov'];
  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'MP4, WebM, OGG, AVI, MOV 파일만 업로드 가능합니다.' };
  }

  return { isValid: true };
}

// 비디오 삭제 함수
export async function deleteLectureVideo(filePath: string): Promise<void> {
  const supabase = createClient();
  
  // URL에서 파일 경로 추출
  const pathParts = filePath.split(`/${VIDEO_BUCKET_NAME}/`);
  const relativePath = pathParts[pathParts.length - 1];

  const { error } = await supabase.storage
    .from(VIDEO_BUCKET_NAME)
    .remove([relativePath]);

  if (error) {
    throw new Error(`비디오 삭제 실패: ${error.message}`);
  }
}