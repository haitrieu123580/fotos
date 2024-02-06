export interface LoginPayload {
    data: {
        username: string;
        password: string;
    };
    onSuccess?: () => void;
    onError?: () => void;
}
