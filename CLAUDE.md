# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

This is a Next.js 15 web application for "대모산 개발단" (Demodev Group), an online learning platform focused on development courses and challenges. The app uses React 19, TypeScript 5, and Tailwind CSS for styling with a custom purple brand theme.

## Commands

### Development

**IMPORTANT**: This project uses `npm` as the package manager.

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Create production build
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code quality checks

### Package Management

- `npm install` - Install dependencies
- `npm install <package>` - Add a new dependency
- `npm uninstall <package>` - Remove a dependency

### TypeScript

- No separate TypeScript check command; TypeScript errors appear during development and build

## Architecture

### App Structure

The project uses Next.js 13+ App Router with the following key areas:

1. **app/** - Next.js app router pages and layouts

   - Routes are file-system based
   - Client components require "use client" directive
   - Server components are default
   - `/curriculum` - Course listing page with sidebar navigation
   - `/mypage` - User dashboard with learning progress and purchase history

2. **components/** - Reusable React components

   - `ui/` - Base UI components using shadcn/ui with Radix UI primitives and CVA for variants
   - `admin/` - Admin-specific components (Header, Sidebar, UserProfileDropdown, LectureModal)
   - `curriculum/` - Components for the course listing page (LecturesHero, LecturesGrid, LecturesSidebar, LectureCard)
   - `mypage/` - User dashboard components:
     - `MyPageDashboard.tsx` - Main dashboard with statistics and progress
     - `MyPageProfile.tsx` - User profile management
     - `MyPageSidebar.tsx` - Navigation sidebar with user statistics
     - `PurchaseHistory.tsx` - Purchase history with filtering and status tracking
     - `DatePicker.tsx` - Custom date range picker for filtering
   - Business components like CourseCard, Header, Footer, HeroSection (now using react-multi-carousel)
   - ConsoleEasterEgg - Developer console easter egg component

3. **data/** - Static data and type definitions

   - Course data structure with interfaces for type safety
   - `courses.ts` exports Course interface and static data arrays
   - `challenges.ts` contains challenge-related data

4. **lib/** - Utility functions

   - `utils.ts` contains `cn()` helper for className merging
   - `lecture-utils.ts` contains lecture-related utilities

5. **utils/** - Additional utility functions
   - `console-easter-egg.ts` - Console easter egg implementation showing DEMODEV ASCII art

6. **types/** - TypeScript type definitions
   - `auth.ts` - Authentication-related types
   - `purchase.ts` - Purchase and payment history types with 8 different status states

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
- **Theming**: CSS custom properties defined in globals.css with purple brand color palette
- **Dark Mode**: Configured via Tailwind's class-based dark mode
- **Icons**: Lucide React icons throughout the application
- **Typography**: Noto Sans KR font for Korean content support
- **Custom Utilities**: Brand colors, scrollbar styling, line clamp utilities

### Carousel Implementation

The project uses `react-multi-carousel` for carousel functionality:

- **HeroSection**: Main homepage carousel with responsive breakpoints
- Replaced `react-slick` with `react-multi-carousel` for better performance and React 19 compatibility
- Features center mode, autoplay, and responsive design

### Developer Experience Features

**Console Easter Egg**: When opening developer tools, users see:
- DEMODEV ASCII art in purple theme
- Welcome message and company information
- Hidden commands: `demodev.team()`, `demodev.courses()`, `demodev.secret()`
- Implemented via ConsoleEasterEgg component in the root layout

### MyPage System Architecture

The MyPage system provides a comprehensive user dashboard:

1. **Dashboard Features**:
   - Learning progress tracking with statistics
   - Course completion metrics
   - User profile management
   - Purchase history with advanced filtering

2. **Purchase History System**:
   - 8 different purchase status states (결제완료, 수강중, 수강완료, etc.)
   - Date range filtering with custom date picker
   - Status-based filtering with dropdown
   - Responsive table layout with mobile optimization

3. **Component Architecture**:
   - Sidebar navigation with collapsible menu
   - Statistics cards showing user metrics
   - Tabbed interface for different sections
   - Integrated with main app navigation

### Data Structure

Core data models include:

**Course Interface**:
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

**Purchase Types**:
```tsx
type PurchaseStatus = 
  | "결제완료"    // Payment Complete
  | "수강중"      // In Progress
  | "수강완료"    // Completed
  | "환불요청"    // Refund Requested
  | "환불완료"    // Refund Complete
  | "수강취소"    // Cancelled
  | "결제대기"    // Payment Pending
  | "결제실패";   // Payment Failed
```

### Key Architectural Decisions

1. **Styling**: Tailwind CSS utility-first approach with CSS variables for theming and custom brand colors
2. **Components**: Functional components with TypeScript interfaces for props
3. **State**: Local component state only - no global state management
4. **Data**: Static data in TypeScript files - prepared for API integration
5. **Routing**: File-based routing with Next.js App Router
6. **Authentication**: Prepared for Supabase, currently using placeholder implementation
7. **Admin Interface**: Comprehensive admin system with reusable components
8. **User Dashboard**: MyPage system with purchase history and learning progress
9. **Carousel**: react-multi-carousel for better performance and compatibility

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

1. **Package Manager**: Uses `npm` as the package manager
2. **No Testing Framework**: Currently no tests or testing setup
3. **Admin Authentication**: Complete authentication system with localStorage, ready for Supabase upgrade
4. **External Integration**: Courses link to external platform (latpeed.com)
5. **Korean Language**: Content is primarily in Korean - ensure proper UTF-8 encoding when editing files
6. **Development State**: Admin and MyPage systems are fully functional
7. **Hydration**: Client components use mounted state pattern to prevent hydration mismatches
8. **UI Library**: Uses shadcn/ui components with Radix UI primitives for accessibility
9. **Layout Separation**: Login page (clean) vs Dashboard pages (with sidebar/header) via separate layouts
10. **Authentication Pattern**: Dashboard layout handles auth checks, individual pages don't need auth logic
11. **Carousel Library**: Uses react-multi-carousel instead of react-slick for React 19 compatibility
12. **Developer Tools**: Console easter egg shows DEMODEV branding when developer tools are opened
13. **MyPage Features**: User dashboard with purchase history, date filtering, and learning progress tracking
14. **Brand Theme**: Purple color palette with custom Tailwind utilities for consistent branding