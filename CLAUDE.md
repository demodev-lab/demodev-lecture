# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js 15 web application for "대모산 개발단" (Demodev Group), an online learning platform focused on development courses and challenges. The app uses React 19, TypeScript 5, and Tailwind CSS for styling.

## Commands

### Development

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### TypeScript

- No separate TypeScript check command; TypeScript errors appear during development and build

## Architecture

### App Structure

The project uses Next.js 13+ App Router with the following key areas:

1. **app/** - Next.js app router pages and layouts

   - Routes are file-system based
   - Client components require "use client" directive
   - Server components are default

2. **components/** - Reusable React components

   - `ui/` - Base UI components using shadcn/ui with Radix UI primitives and CVA for variants
   - `admin/` - Admin-specific components (Header, Sidebar, UserProfileDropdown, LectureModal)
   - Business components like CourseCard, Header, Footer

3. **data/** - Static data and type definitions

   - Course data structure with interfaces for type safety
   - `courses.ts` exports Course interface and static data arrays

4. **lib/** - Utility functions

   - `utils.ts` contains `cn()` helper for className merging

5. **utils/** - Additional utility functions
   - `supabase.ts` - Supabase client configuration (requires environment variables)

### Admin System Architecture

The admin system uses a comprehensive multi-layer approach with proper authentication flow:

1. **Authentication Flow**:

   - `/admin` - Redirects to login page
   - `/admin/login` - Enhanced login page with form validation and loading states
   - Uses localStorage for authentication state management
   - Hardcoded credentials: admin@demodev.com / admin123
   - Prepared for Supabase integration

2. **Layout Structure**:

   - `/admin/layout.tsx` - Simple passthrough layout
   - `/admin/dashboard/layout.tsx` - Protected layout with sidebar/header + authentication check
   - Login page has no sidebar/header for clean authentication experience
   - Dashboard pages automatically include sidebar/header through layout

3. **Dashboard Layer**: `/admin/dashboard` - Protected admin interface

   - Authentication verification in dashboard layout
   - Sidebar navigation with mobile responsive design
   - Statistics cards showing platform metrics
   - Activity feed and quick action buttons
   - Lectures management at `/admin/dashboard/lectures`

4. **Component Architecture**: `components/admin/`
   - Modular admin components for reusability
   - Sidebar component with navigation items
   - Header and UserProfileDropdown with logout functionality
   - Specialized components like LectureModal

### Authentication Integration

The project implements a complete authentication system:

- **Current Implementation**: localStorage-based authentication with hardcoded credentials
- **Login Flow**: `/admin` → `/admin/login` → `/admin/dashboard` (on success)
- **Protection**: Dashboard layout automatically redirects unauthenticated users to login
- **Logout**: UserProfileDropdown component clears authentication and redirects to login

### Client-Side Component Patterns

For components that need client-side features, follow these patterns to avoid hydration issues:

```tsx
"use client";

import { useState, useEffect } from "react";

export default function Component() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or loading skeleton
  }

  return (
    // Component JSX
  );
}
```

### UI Component System

The project uses shadcn/ui components built on Radix UI primitives:

- **Styling**: Tailwind CSS with CSS variables for theming
- **Variants**: Class Variance Authority (CVA) for component variants
- **Theming**: CSS custom properties defined in globals.css
- **Dark Mode**: Configured via Tailwind's class-based dark mode
- **Icons**: Lucide React icons throughout the application

### Data Structure

Core data model centered around Course interface:

```tsx
interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  ratingCount: number;
  likeCount: number;
  thumbnail: string;
  isLiked?: boolean;
  url: string;
}
```

### Key Architectural Decisions

1. **Styling**: Tailwind CSS utility-first approach with CSS variables for theming
2. **Components**: Functional components with TypeScript interfaces for props
3. **State**: Local component state only - no global state management
4. **Data**: Static data in TypeScript files - prepared for API integration
5. **Routing**: File-based routing with Next.js App Router
6. **Authentication**: Prepared for Supabase, currently using placeholder implementation
7. **Admin Interface**: Comprehensive admin system with reusable components

### Component Patterns

Components follow this structure:

```tsx
"use client"; // Only if client-side features needed

interface ComponentProps {
  // Typed props
}

export function Component({ props }: ComponentProps) {
  // Implementation
}
```

### Path Aliases

- `@/*` maps to project root for clean imports

## Important Notes

1. **No Testing Framework**: Currently no tests or testing setup
2. **Admin Authentication**: Complete authentication system with localStorage, ready for Supabase upgrade
3. **External Integration**: Courses link to external platform (latpeed.com)
4. **Korean Language**: Content is primarily in Korean - ensure proper UTF-8 encoding when editing files
5. **Development State**: Admin system is fully functional with complete authentication flow
6. **Hydration**: Client components use mounted state pattern to prevent hydration mismatches
7. **UI Library**: Uses shadcn/ui components with Radix UI primitives for accessibility
8. **Layout Separation**: Login page (clean) vs Dashboard pages (with sidebar/header) via separate layouts
9. **Authentication Pattern**: Dashboard layout handles auth checks, individual pages don't need auth logic

## 🔍 **주요 문제점들**

### 1. **package-lock.json vs pnpm-lock.yaml 충돌**

- 프로젝트는 `pnpm`을 사용하고 있지만 `package-lock.json`도 존재
- `package-lock.json`에는 아직 clerk 의존성이 남아있음
- Vercel이 어떤 패키지 매니저를 사용할지 혼란스러워할 수 있음

### 2. **캐시 문제**

- Vercel에 이전 빌드 캐시가 남아있을 수 있음

## 🛠️ **해결 방법**

### 1. package-lock.json 삭제 (중요!)

```bash
rm package-lock.json
```

### 2. pnpm 의존성 재설치

```bash
pnpm install
```

### 3. CLAUDE.md에서 supabase 환경변수 언급 제거

```markdown:CLAUDE.md
<code_block_to_apply_changes_from>
```

### 4.
