import axiosInstance from "./axiosConfig";

export const login = async (username, password) => {
  const response = await axiosInstance.post("/api/User/login", {
    username,
    password,
  });
  return response.data;
};

export const signup = async (user) => {
  const response = await axiosInstance.post("/api/User/register", user);
  return response.data;
};
