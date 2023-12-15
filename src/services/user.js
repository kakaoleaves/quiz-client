import axiosInstance from "./axiosConfig";

export const getUsers = async () => {
  const response = await axiosInstance.get("/api/user");
  return response.data;
};

export const editUser = async (userId, data) => {
  const response = await axiosInstance.put(`/api/user/${userId}`, data);
  return response.data;
};

export const deleteUser = async (userId) => {
  const response = await axiosInstance.delete(`/api/user/${userId}`);
  return response.data;
};
