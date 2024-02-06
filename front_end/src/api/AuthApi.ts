import axios from "axios";
const BASE_URL = import.meta.env.VITE_API_URL + "/api/auth";
const config = {
    headers: {
        'Content-Type': 'application/json',
    },
};
export const LoginApi = async (data: any) => {
    const response = await axios.post(`${BASE_URL}/sign-in`, JSON.stringify(data), config);

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
