export interface User {
  id: number;
  firstName: string;
  lastName: string;
  gender: string;
  companyName: string;
  email: string;
}

export interface JwtResponse {
  token: string;
  user: User;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  gender: string;
  companyName: string;
  email: string;
  password: string;
}

export interface EmailRequest {
  email: string;
}

export interface ResetPasswordRequest {
  otp: string;
  newPassword: string;
}

export interface UpdateUserRequest {
  firstName: string;
  lastName: string;
  gender: string;
  companyName: string;
}
