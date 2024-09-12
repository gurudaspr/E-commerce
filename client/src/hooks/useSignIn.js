import { useState } from 'react';
import axiosInstance from '../config/axios.js';
import toast from "react-hot-toast";
import { useAuthStore } from '../store/useAuthStore.js';
import { useUserStore } from '../store/useUserStore.js';

const useSignIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Access Zustand store methods
    const setToken = useAuthStore(state => state.setToken);

    const setUser = useUserStore(state => state.setUser);

    const signIn = async (data) => {
        setIsLoading(true);
        try {
            const response = await axiosInstance.post('/auth/login', data);
            const { token, user } = response.data;
            const { role, name, email } = user;

            setToken(token, role); // Set token and role in useAuthStore
            setUser(name, email); // Set name and email in useUserStore

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