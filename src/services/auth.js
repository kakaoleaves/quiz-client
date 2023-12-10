import axiosInstance from "./axiosConfig";

export const login = async (username, password) => {
    const response = await axiosInstance.post("/login", {
        username,
        password,
    });
    return response.data;
}


export const getWeatherForecast = async () => {
    const response = await axiosInstance.get("/weatherforecast");
    return response.data;
}