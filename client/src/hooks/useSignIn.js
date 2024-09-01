import { useState } from 'react';
import axiosInstance from '../config/axios.js';
import toast from "react-hot-toast";
import { useAuthStore } from '../store/useAuthStore.js';

const useSignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Access Zustand store methods
    const { setToken } = useAuthStore(state => ({
        setToken: state.setToken,
    }));

    const signIn = async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/auth/login', data);
            const token = response.data.token;
            const role = response.data.user.role;
            setToken(token,role);
            setSuccess(true);
            toast.success(response.data.message);
        } catch (error) {
            toast.error(`Login failed: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return { signIn, isLoading, success };
};

export default useSignIn;