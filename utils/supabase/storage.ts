import { createClient } from './client';

const BUCKET_NAME = 'lecture-thumbnails';

export async function uploadLectureThumbnail(file: File, fileName?: string): Promise<string> {
  const supabase = createClient();
  
  // 파일명 생성 (타임스탬프 + 원본 파일명)
  const timestamp = Date.now();
  const fileExtension = file.name.split('.').pop();
  const uploadFileName = fileName 
    ? `${fileName}-${timestamp}.${fileExtension}`
    : `lecture-${timestamp}.${fileExtension}`;

  // 파일 업로드
  const { data, error } = await supabase.storage
    .from(BUCKET_NAME)
    .upload(`thumbnails/${uploadFileName}`, file, {
      cacheControl: '3600',
      upsert: false,
    });

  if (error) {
    throw new Error(`업로드 실패: ${error.message}`);
  }

  // 공개 URL 생성
  const { data: urlData } = supabase.storage
    .from(BUCKET_NAME)
    .getPublicUrl(data.path);

  return urlData.publicUrl;
}

export async function deleteLectureThumbnail(filePath: string): Promise<void> {
  const supabase = createClient();
  
  // URL에서 파일 경로 추출
  const pathParts = filePath.split(`/${BUCKET_NAME}/`);
  const relativePath = pathParts[pathParts.length - 1];

  const { error } = await supabase.storage
    .from(BUCKET_NAME)
    .remove([relativePath]);

  if (error) {
    throw new Error(`삭제 실패: ${error.message}`);
  }
}

export async function createStorageBucket(): Promise<void> {
  const supabase = createClient();
  
  // 버킷이 이미 존재하는지 확인
  const { data: buckets } = await supabase.storage.listBuckets();
  const bucketExists = buckets?.some(bucket => bucket.name === BUCKET_NAME);

  if (!bucketExists) {
    // 버킷 생성
    const { error } = await supabase.storage.createBucket(BUCKET_NAME, {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
      fileSizeLimit: 5 * 1024 * 1024, // 5MB
    });

    if (error) {
      console.warn(`버킷 생성 실패: ${error.message}`);
    }
  }
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