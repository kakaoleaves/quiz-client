import axiosInstance from "./axiosConfig";

export const getUsers = async () => {
  const response = await axiosInstance.get("/api/user");
  return response.data;
};
