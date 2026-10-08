import { axiosInstance } from "./axios";

export const registerUser = async (formData) => {
  const response = await axiosInstance.post("/auth/signup", formData);
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await axiosInstance.post("/auth/login", formData);
  return response.data;
};

export const logoutUser = async () => {
  const response = await axiosInstance.post("/auth/logout");
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

export const getUserFriends = async () => {
  const response = await axiosInstance.get("/users/friends");
  return response.data;
};

export const getRecommendedUsers = async () => {
  const response = await axiosInstance.get("/users");
  return response.data;
};

export const getOutgoingFriendReqs = async () => {
  const response = await axiosInstance.get("/users/friend-requests/outgoing");
  return response.data;
};

export const sendFriendRequest = async (userId) => {
  const response = await axiosInstance.post(`/users/friend-requests/${userId}`);
  return response.data;
};
