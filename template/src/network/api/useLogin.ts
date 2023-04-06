import { useMutation } from "react-query";
import { ICredentials, useAuthStore } from "../../stores/authStore";
import { axiosInstance } from "../axiosInstance";

export const useLogin = () => {
    const setCredentials = useAuthStore((state) => state.setCredentials);
    return useMutation(async (payload: { username: string; password: string }) => {
        const response = await axiosInstance.post<ICredentials>(
            "/api/v1/auth/login",
            {
                ...payload,
                scope: "cms",
            },
            {
                skipAuthRefresh: true,
            },
        );
        setCredentials(response.data);
        return response;
    });
};
