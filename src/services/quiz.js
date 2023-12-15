import axiosInstance from "./axiosConfig";

export const getQuiz = async () => {
  const response = await axiosInstance.get("/api/Question");
  return response.data;
};

export const createQuiz = async (data) => {
  const response = await axiosInstance.post("/api/Question", data);
  return response.data;
};

export const editQuiz = async (id, data) => {
  const response = await axiosInstance.put(`/api/Question/${id}`, data);
  return response.data;
};

export const deleteQuiz = async (id) => {
  const response = await axiosInstance.delete(`/api/Question/${id}`);
  return response.data;
};
