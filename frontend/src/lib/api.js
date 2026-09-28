import { axiosInstance } from "./axios";

export const registerUser = async (formData) => {
  const response = await axiosInstance.post("/auth/signup", formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  return response.data;
};

export const fetchAuthUser = async () => {
  const response = await axiosInstance.get("/auth/me");
  return response.data;
};

export const completeOnboarding = async (formData) => {
  const response = await axiosInstance.post("/auth/onboarding", formData);
  return response.data;
};
