"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // 에러 로깅 서비스에 에러를 기록할 수 있습니다
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="max-w-md w-full p-6 bg-white rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-red-600 mb-4">
                오류가 발생했습니다
              </h2>
              <p className="text-gray-600 mb-4">
                페이지를 불러오는 중 문제가 발생했습니다. 
                잠시 후 다시 시도해주세요.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="w-full px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-600 transition-colors"
              >
                페이지 새로고침
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}