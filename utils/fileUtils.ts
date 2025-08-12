// File to Base64 변환
export async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert file to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// Blob URL to Base64 변환
export async function blobUrlToBase64(blobUrl: string): Promise<string> {
  try {
    const response = await fetch(blobUrl);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === 'string') {
          resolve(reader.result);
        } else {
          reject(new Error('Failed to convert blob to base64'));
        }
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Failed to convert blob URL to base64:', error);
    return blobUrl; // 실패 시 원본 URL 반환
  }
}

// Base64 유효성 확인
export function isBase64(str: string): boolean {
  return str.startsWith('data:');
}

// Blob URL 유효성 확인
export function isBlobUrl(str: string): boolean {
  return str.startsWith('blob:');
}