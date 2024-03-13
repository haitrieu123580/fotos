import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/auth";

export const LoginApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}/sign-in`, data);
    return response;
}

export const GetProfileApi = async () => {
    const response = await AxiosConfig.get(`${BASE_URL}/me`);
    return response;
}

export const GetNewAccessTokenApi = async (refresh_token: string | any) => {
    const response = await AxiosConfig.post(`${BASE_URL}/get-token`, JSON.stringify({ refresh_token }));
    return response;
}