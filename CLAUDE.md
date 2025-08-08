# CLAUDE.md

This file provides comprehensive guidance to Claude Code (claude.ai/code) when working with the DemoLearn platform - an online learning platform for development courses and challenges.

## Overview

DemoLearn (대모산 개발단) is a comprehensive online education platform built with Next.js 15, React 19, TypeScript 5, and Tailwind CSS. The platform specializes in AI-powered coding education, offering structured courses, challenges, and a complete learning management system.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Frontend**: React 19, TypeScript 5
- **Authentication**: Supabase Auth with SSR support
- **Database**: Supabase (PostgreSQL)
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
│   ├── admin/             # Admin dashboard (not in use)
│   ├── auth/              # Auth routes
│   │   ├── callback/      # OAuth callback handler
│   │   └── actions.ts     # Server actions for auth
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
│   ├── admin/            # Admin components (not in use)
│   ├── auth/             # Authentication components
│   │   ├── AuthModal.tsx  # Login modal
│   │   ├── SupabaseAuthContext.tsx  # Auth context provider
│   │   └── SupabaseAuthForm.tsx     # Auth form component
│   ├── challenge/        # Challenge-related components
│   ├── curriculum/       # Course listing components
│   ├── lecture/          # Lecture viewing components
│   ├── main/             # Homepage components
│   ├── mypage/           # User dashboard components
│   ├── payment/          # Payment components
│   ├── signup/           # Registration components
│   └── ui/               # Base UI components
├── utils/                 # Utility functions
│   ├── supabase/         # Supabase client utilities
│   │   ├── client.ts     # Browser client
│   │   ├── server.ts     # Server component client
│   │   └── middleware.ts # Middleware utilities
│   └── supabase.ts       # Legacy client (for compatibility)
├── data/                 # Static data and fixtures
├── lib/                  # Utility functions
├── types/                # TypeScript type definitions
├── middleware.ts         # Next.js middleware for auth
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
  rating: number
  review_count: number
  is_new: boolean
  is_active: boolean
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

## User Flows

### 1. Registration Flow (Supabase Auth)
```
홈페이지 → 회원가입 버튼 클릭
→ /signup 페이지로 이동
→ 회원가입 폼 표시
→ 이메일/비밀번호 입력
→ Supabase Auth signUp 호출
→ 이메일 확인 메일 발송
→ 이메일 확인 후 자동 로그인
```

### 2. Login Flow (Supabase Auth)
```
홈페이지 → 로그인 버튼 클릭
→ AuthModal 오픈
→ 로그인 폼 표시
→ 이메일/비밀번호 입력
→ Supabase Auth signInWithPassword 호출
→ 세션 쿠키 설정
→ 로그인 완료
```

### 3. Lecture Purchase Flow
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
- **Favorites**: Context API (FavoriteLecturesContext)

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

## Authentication System (Supabase Auth)

### Configuration
1. **Environment Variables**
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your-project-url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
   ```

2. **Client Setup**
   - Browser client: `utils/supabase/client.ts`
   - Server client: `utils/supabase/server.ts`
   - Middleware: `utils/supabase/middleware.ts`

3. **Auth Features**
   - Email/Password authentication
   - OAuth providers (Google, GitHub ready)
   - Session management with cookies
   - Automatic session refresh via middleware
   - Server-side authentication (SSR)

## Security Considerations

1. **Authentication**
   - Supabase Auth with PKCE flow
   - Secure session management via cookies
   - Automatic token refresh
   - Server-side session validation

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
   - Suspense for async components

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

## Deployment

### Environment Variables
```env
# .env.local
# Supabase Configuration (Required)
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# OAuth Configuration (Optional)
NEXT_PUBLIC_KAKAO_CLIENT_ID=your_kakao_client_id
NEXT_PUBLIC_NAVER_CLIENT_ID=your_naver_client_id
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your_google_client_id
NEXT_PUBLIC_APPLE_CLIENT_ID=your_apple_client_id
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

### Features to Implement
1. **Learning Features**
   - Live streaming classes
   - Discussion forums
   - Assignment submissions
   - Peer reviews
   - Certificates generation
   - Learning paths
   - Quiz system

2. **User Features**
   - Profile editing
   - Points/rewards system
   - Social login (Google, Kakao)
   - Email notifications
   - Achievement badges

3. **Payment Features**
   - Gift card system
   - Subscription model
   - Bundle purchases
   - Referral program

4. **Content Features**
   - Advanced search filters
   - Course recommendations
   - Offline download
   - Mobile app

### Technical Improvements
- GraphQL API migration
- Microservices architecture
- Redis caching
- WebSocket for real-time features
- PWA implementation
- Internationalization (i18n)

## Important Notes

1. **Package Manager**: Always use `npm` (not yarn or pnpm)
2. **React Version**: React 19 with Next.js 15
3. **TypeScript**: Strict mode enabled
4. **Authentication**: Supabase Auth with SSR support (fully implemented)
5. **Payment**: Integration ready for Korean payment gateways
6. **Language**: Korean-first with UTF-8 encoding
7. **Mobile**: Responsive design with mobile-first approach
8. **Browser Support**: Modern browsers (Chrome, Firefox, Safari, Edge)

## Removed Files (Legacy Auth System)

The following files have been removed after migrating to Supabase Auth:
- `components/auth/AuthContext.tsx` - Old custom auth context
- `components/auth/AuthForm.tsx` - Old auth form with hardcoded logic
- `utils/supabase-server.ts` - Deprecated server client
- `utils/supabase-client.ts` - Deprecated browser client

## Console Easter Egg

When developer tools are opened, users see:
- DEMODEV ASCII art in purple theme
- Hidden commands: `demodev.team()`, `demodev.courses()`, `demodev.secret()`
- Welcome message for developers

---

Last Updated: 2025-01-08
Version: 3.0.0 (Supabase Auth Integration)