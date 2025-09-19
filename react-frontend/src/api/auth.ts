import type { SignUpData, UserCredentials } from "../interfaces/user/user";
import instance from "./axios";

export interface ApiResponse {
  status: "success" | "error";
  data?: any;    
  message?: string;
}

export const signup = async (user: SignUpData): Promise<ApiResponse> => {
  try {
    const response = await instance.post("/auth/signup", user);
    return response.data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.message || "Signup failed",
    };
  }
};

export const logIn = async (user: UserCredentials): Promise<ApiResponse> => {
  try {
    const response = await instance.post("/auth/login", user);
    return response.data;
  } catch (error: any) {
    return {
      status: "error",
      message: error.response?.data?.message || "Login failed",
    };
  }
};
