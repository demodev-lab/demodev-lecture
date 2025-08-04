// 인증 관련 타입 정의

export interface User {
  id: string;
  email: string;
  name?: string;
  role?: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  success: boolean;
  user?: User;
  token?: string;
  message?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  stayLoggedIn?: boolean;
}

export interface SignupData extends LoginCredentials {
  name: string;
  passwordConfirm: string;
  agreeTerms: boolean;
}

export interface AuthError {
  code: string;
  message: string;
  field?: string;
}

export interface Session {
  user: User;
  expiresAt: Date;
}