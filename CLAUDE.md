# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with the DemoLearn platform - an online learning platform for development courses and challenges.

## Overview

DemoLearn (대모산 개발단) is a comprehensive online education platform built with Next.js 15, React 19, TypeScript 5, and Tailwind CSS. The platform specializes in AI-powered coding education, offering structured courses, challenges, and a complete learning management system.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript 5
- **Styling**: Tailwind CSS with custom purple brand theme
- **UI Components**: shadcn/ui with Radix UI primitives
- **Icons**: Lucide React
- **Carousel**: react-multi-carousel
- **Font**: Noto Sans KR
- **Package Manager**: npm (IMPORTANT: Do not use yarn or pnpm)

## Commands

### Development
```bash
npm run dev        # Start development server on http://localhost:3000
npm run build      # Create production build
npm run start      # Start production server
npm run lint       # Run ESLint for code quality checks
```

### Package Management
```bash
npm install              # Install dependencies
npm install <package>    # Add a new dependency
npm uninstall <package>  # Remove a dependency
```

## Project Structure

### Directory Layout
```
demolearn/
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard system
│   ├── challenge/         # Challenge pages
│   ├── class/            # Class-related pages
│   │   ├── best/         # Best courses page
│   │   └── openScheduled/ # Upcoming courses
│   ├── curriculum/        # Course curriculum listing
│   ├── find/             # Account recovery pages
│   ├── lecture/          # Lecture detail pages
│   ├── mypage/           # User dashboard
│   ├── payment/          # Payment flow
│   └── signup/           # Registration
├── components/            # Reusable React components
│   ├── @shared/          # Shared components (Header, Footer)
│   ├── admin/            # Admin-specific components
│   ├── auth/             # Authentication components
│   ├── challenge/        # Challenge-related components
│   ├── curriculum/       # Course listing components
│   ├── lecture/          # Lecture viewing components
│   ├── main/             # Homepage components
│   ├── mypage/           # User dashboard components
│   ├── payment/          # Payment components
│   ├── signup/           # Registration components
│   └── ui/               # Base UI components
├── data/                 # Static data and fixtures
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
└── public/               # Static assets
```

## Database Schema (ERD)

### Core Entities

#### 1. Users (사용자)
```typescript
{
  id: string (PK)
  email: string (unique)
  password: string (hashed)
  name: string
  phone: string
  role: 'user' | 'admin'
  created_at: timestamp
  updated_at: timestamp
}
```

#### 2. Lectures (강의)
```typescript
{
  id: string (PK)
  title: string
  subtitle: string
  instructor_id: string (FK → Instructors)
  description: string
  detailed_description: text
  thumbnail: string
  badge: string
  category_id: string (FK → Categories)
  subcategory_id: string (FK → Categories)
  price: number
  discounted_price: number
  duration: string
  level: 'beginner' | 'intermediate' | 'advanced'
  language: string
  rating: number
  review_count: number
  enrolled_count: number
  is_new: boolean
  is_active: boolean
  last_updated: timestamp
  created_at: timestamp
  updated_at: timestamp
}
```

#### 3. Categories (카테고리)
```typescript
{
  id: string (PK)
  name: string
  parent_id: string (FK → Categories, nullable)
  order: number
  is_active: boolean
}
```

Current Category Structure:
- **오리지널**
  - 바이브 빌더스
- **바이브 코딩**
  - 프롬프트 엔지니어링
  - 컨텍스트 엔지니어링
  - AI 도구 활용
- **앱/웹**
  - 앱 바이브 코딩 입문
  - 웹 바이브 코딩 입문
  - 앱 수익화
  - 웹 수익화
- **자동화**
  - n8n
  - Make
  - PyTorch
  - 크롤링
  - AI 업무 자동화

#### 4. Chapters (강의 챕터)
```typescript
{
  id: string (PK)
  lecture_id: string (FK → Lectures)
  section_id: string (FK → Sections)
  title: string
  duration: number (seconds)
  video_url: string
  order: number
  is_free: boolean
  description: text
}
```

#### 5. Sections (강의 섹션)
```typescript
{
  id: string (PK)
  lecture_id: string (FK → Lectures)
  title: string
  order: number
}
```

#### 6. Purchases (구매내역)
```typescript
{
  id: string (PK)
  user_id: string (FK → Users)
  lecture_id: string (FK → Lectures)
  payment_number: string (unique)
  payment_date: timestamp
  status: PurchaseStatus
  original_price: number
  coupon_discount: number
  voucher_discount: number
  points_used: number
  final_amount: number
  refundable: boolean
  created_at: timestamp
}
```

Purchase Status Types:
- `order_pending_unpayable` - 주문대기(결제불가)
- `order_pending_payable` - 주문대기(결제가능)
- `order_cancelled` - 주문취소
- `completed` - 결제완료/수강중
- `payment_cancelled` - 결제취소
- `refund_pending` - 환불요청
- `refunded` - 환불완료

#### 7. LectureProgress (수강 진도)
```typescript
{
  user_id: string (FK → Users)
  lecture_id: string (FK → Lectures)
  chapter_id: string (FK → Chapters)
  watched_seconds: number
  completed: boolean
  last_updated: timestamp
}
```

#### 8. Reviews (리뷰)
```typescript
{
  id: string (PK)
  user_id: string (FK → Users)
  lecture_id: string (FK → Lectures)
  rating: number (1-5)
  content: text
  is_best_review: boolean
  created_at: timestamp
  updated_at: timestamp
}
```

#### 9. Instructors (강사)
```typescript
{
  id: string (PK)
  name: string
  bio: text
  avatar: string
  experience: string
  specialties: string[] (JSON)
  created_at: timestamp
}
```

#### 10. Challenges (챌린지)
```typescript
{
  id: string (PK)
  title: string
  description: string
  thumbnail: string
  url: string
  price: number
  is_active: boolean
  created_at: timestamp
}
```

#### 11. Favorites (찜목록)
```typescript
{
  user_id: string (FK → Users)
  lecture_id: string (FK → Lectures)
  created_at: timestamp
}
```

## API Endpoints Structure

### Authentication
```
POST   /api/auth/login          # 로그인
POST   /api/auth/signup         # 회원가입
POST   /api/auth/logout         # 로그아웃
POST   /api/auth/refresh        # 토큰 갱신
POST   /api/auth/verify-phone   # 휴대폰 인증
POST   /api/auth/find-id        # 아이디 찾기
POST   /api/auth/reset-password # 비밀번호 재설정
```

### Lectures
```
GET    /api/lectures                    # 강의 목록
GET    /api/lectures/:id               # 강의 상세
GET    /api/lectures/:id/chapters      # 강의 챕터 목록
GET    /api/lectures/:id/reviews       # 강의 리뷰
POST   /api/lectures/:id/enroll        # 강의 수강 신청
GET    /api/lectures/categories        # 카테고리 목록
GET    /api/lectures/search           # 강의 검색
```

### User Dashboard
```
GET    /api/users/profile              # 프로필 조회
PUT    /api/users/profile              # 프로필 수정
GET    /api/users/purchases            # 구매 내역
GET    /api/users/progress             # 수강 진도
GET    /api/users/favorites            # 찜 목록
POST   /api/users/favorites/:lectureId # 찜 추가
DELETE /api/users/favorites/:lectureId # 찜 삭제
```

### Payments
```
POST   /api/payments/prepare           # 결제 준비
POST   /api/payments/complete          # 결제 완료
POST   /api/payments/cancel            # 결제 취소
POST   /api/payments/refund            # 환불 요청
GET    /api/payments/:id               # 결제 상세
```

### Admin
```
GET    /api/admin/dashboard            # 대시보드 통계
GET    /api/admin/lectures             # 강의 관리
POST   /api/admin/lectures             # 강의 생성
PUT    /api/admin/lectures/:id         # 강의 수정
DELETE /api/admin/lectures/:id         # 강의 삭제
GET    /api/admin/users                # 사용자 관리
GET    /api/admin/payments             # 결제 관리
```

## User Flows

### 1. Registration Flow
```
홈페이지 → 회원가입 버튼 클릭
→ AuthModal 오픈
→ 회원가입 폼 표시
→ 휴대폰 번호 입력
→ 인증번호 발송
→ 인증번호 확인
→ 회원가입 완료
→ 자동 로그인
```

### 2. Lecture Purchase Flow
```
강의 목록 → 강의 선택
→ 상세 페이지 진입
→ "수강 신청" 버튼 클릭
→ 로그인 확인 (미로그인시 AuthModal)
→ 결제 페이지 이동
→ 결제 정보 입력
→ 결제 완료
→ 마이페이지 수강 목록 추가
```

### 3. Lecture Learning Flow
```
마이페이지 → 수강중인 강의
→ 강의 선택
→ 비디오 플레이어 페이지
→ 챕터별 학습
→ 진도 자동 저장
→ 완료시 수료증 발급
```

### 4. Admin Management Flow
```
/admin 접속 → 로그인 (admin@demodev.com / admin123)
→ 대시보드 진입
→ 강의 관리 / 사용자 관리 / 통계 확인
→ CRUD 작업 수행
```

## Component Architecture

### Atomic Design Pattern
```
1. UI Components (atoms)
   - Button, Input, Card, Badge
   - Radix UI primitives with CVA variants

2. Feature Components (molecules)
   - AuthForm, CourseCard, LectureCard
   - VideoPlayer, ProgressTracker

3. Section Components (organisms)
   - Header, Footer, Sidebar
   - HeroSection, CourseSection

4. Page Components (templates)
   - MyPageDashboard, PaymentPage
   - LecturePlayerLayout

5. Pages (pages)
   - Route-based components
```

### State Management
- **Authentication**: Context API (AuthContext)
- **Local State**: useState, useEffect hooks
- **Form State**: Controlled components
- **URL State**: useSearchParams for filters

### Data Fetching Pattern
```typescript
// Server Components (default)
async function Page() {
  const data = await fetchData();
  return <Component data={data} />;
}

// Client Components
"use client";
function Component() {
  const [data, setData] = useState(null);
  useEffect(() => {
    fetchData().then(setData);
  }, []);
}
```

## Styling System

### Tailwind Configuration
```javascript
// Brand Colors
colors: {
  brand: {
    50: '#f3e8ff',
    100: '#e9d5ff',
    200: '#d8b4fe',
    300: '#c084fc',
    400: '#a855f7',
    500: '#9333ea', // Primary purple
    600: '#7e22ce',
    700: '#6b21a8',
    800: '#581c87',
    900: '#3b0764',
  }
}
```

### Component Styling Pattern
```typescript
// Using CVA for variants
const buttonVariants = cva(
  "base-styles",
  {
    variants: {
      variant: {
        default: "default-styles",
        outline: "outline-styles",
      },
      size: {
        sm: "small-styles",
        md: "medium-styles",
        lg: "large-styles",
      }
    }
  }
);
```

## Security Considerations

1. **Authentication**
   - JWT tokens for session management
   - Secure password hashing (bcrypt)
   - Phone number verification for signup

2. **Authorization**
   - Role-based access control (user/admin)
   - Protected routes with middleware
   - API endpoint authorization

3. **Data Protection**
   - Input validation and sanitization
   - SQL injection prevention
   - XSS protection with React's default escaping

## Performance Optimization

1. **Next.js Optimizations**
   - Static generation for public pages
   - Dynamic imports for code splitting
   - Image optimization with next/image

2. **React Optimizations**
   - Memo for expensive calculations
   - Lazy loading for components
   - Virtualization for long lists

3. **Asset Optimization**
   - Tailwind CSS purging
   - Font subsetting
   - SVG optimization

## Development Guidelines

### Code Style
```typescript
// Component structure
interface ComponentProps {
  // Typed props
}

export function Component({ props }: ComponentProps) {
  // Hooks first
  const [state, setState] = useState();
  
  // Effects
  useEffect(() => {}, []);
  
  // Handlers
  const handleClick = () => {};
  
  // Render
  return <div />;
}
```

### File Naming
- Components: PascalCase (MyComponent.tsx)
- Utilities: camelCase (myUtil.ts)
- Types: PascalCase (MyType.ts)
- Pages: kebab-case folders

### Git Workflow
```bash
# Branch naming
feat/feature-name
fix/bug-description
chore/task-description

# Commit format
feat: Add new feature
fix: Resolve bug
docs: Update documentation
style: Format code
refactor: Restructure code
test: Add tests
chore: Update dependencies
```

## Testing Strategy

### Unit Testing (To be implemented)
```typescript
// Component testing with React Testing Library
describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('text')).toBeInTheDocument();
  });
});
```

### E2E Testing (To be implemented)
```typescript
// Playwright for E2E testing
test('user can purchase course', async ({ page }) => {
  await page.goto('/lectures');
  await page.click('[data-testid="course-card"]');
  await page.click('[data-testid="purchase-button"]');
  // ...
});
```

## Deployment

### Environment Variables
```env
# .env.local
NEXT_PUBLIC_API_URL=https://api.demolearn.com
DATABASE_URL=postgresql://...
JWT_SECRET=...
PHONE_AUTH_API_KEY=...
PAYMENT_API_KEY=...
```

### Build & Deploy
```bash
npm run build
npm run start

# Or with PM2
pm2 start npm --name "demolearn" -- start
```

## Monitoring & Analytics

### Performance Monitoring
- Web Vitals tracking
- Error logging with Sentry
- Analytics with Google Analytics

### User Tracking
- Learning progress analytics
- Course completion rates
- User engagement metrics

## Future Enhancements

1. **Features**
   - Live streaming classes
   - Discussion forums
   - Assignment submissions
   - Peer reviews
   - Certificates generation

2. **Technical**
   - GraphQL API migration
   - Microservices architecture
   - Redis caching
   - WebSocket for real-time features
   - Mobile app development

## Important Notes

1. **Package Manager**: Always use `npm` (not yarn or pnpm)
2. **React Version**: React 19 with Next.js 15
3. **TypeScript**: Strict mode enabled
4. **Authentication**: Currently localStorage, prepared for Supabase
5. **Payment**: Integration ready for Korean payment gateways
6. **Internationalization**: Korean-first with UTF-8 encoding
7. **Mobile**: Responsive design with mobile-first approach
8. **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Console Easter Egg

When developer tools are opened, users see:
- DEMODEV ASCII art in purple theme
- Hidden commands: `demodev.team()`, `demodev.courses()`, `demodev.secret()`
- Welcome message for developers

---

Last Updated: 2025-01-07
Version: 2.0.0