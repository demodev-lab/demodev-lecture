import { Lecture } from '@/app/lecture/[id]/lectures';

// 레벨별 한글 변환 함수
export function getLevelText(level: Lecture['level']): string {
  const levelMap = {
    beginner: '초급',
    intermediate: '중급',
    advanced: '고급'
  };
  return levelMap[level];
}

// 가격 포맷팅 함수
export function formatPrice(price: Lecture['price']): string {
  const formatter = new Intl.NumberFormat('ko-KR');
  if (price.discounted) {
    return `${formatter.format(price.discounted)}원`;
  }
  return `${formatter.format(price.original)}원`;
}

// 할인율 계산 함수
export function getDiscountRate(price: Lecture['price']): number | null {
  if (!price.discounted) return null;
  return Math.round(((price.original - price.discounted) / price.original) * 100);
}