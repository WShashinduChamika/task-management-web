export interface RegisterDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "Admin" | "User";
  status: string;
}

export interface AuthApiResponse {
  user: AuthUser;
  accessToken: string;
  expiresIn: number;
}

