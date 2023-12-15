import axiosInstance from "./axiosConfig";

export const getQuiz = async () => {
  const response = await axiosInstance.get("/api/Question");
  return response.data;
};
