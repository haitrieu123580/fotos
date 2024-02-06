import { AxiosConfig } from "./AxiosConfig";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/auth";

export const LoginApi = async (data: any) => {
    const response = await AxiosConfig.post(`${BASE_URL}/sign-in`, data);

    if (response.status === 200) {
        return {
            Data: response?.data
        }
    }
    else {
        return {
            Message: "Error"
        }
    }
}

export const GetProfileApi = async () => {
    const response = await AxiosConfig.get(`${BASE_URL}/me`);
    if (response.status === 200) {
        return response.data;
    }
    else {
        return {
            Message: "Error"
        }
    }
}
