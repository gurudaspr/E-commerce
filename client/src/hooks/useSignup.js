import { useState } from 'react';
import axiosInstance from '../config/axios.js';
import toast from "react-hot-toast";

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const signup = async (data) => {
        setIsLoading(true);
        setError(null);
        try {
            const response = await axiosInstance.post('/auth/register', data);
            setSuccess(true);
            toast.success(response.data.message);
        } catch (error) {
            setError(error.message);
            toast.error(error.response.data.message);
        } finally {
            setIsLoading(false);
        }
    };
    return { signup, isLoading, error, success };
};
export default useSignup;
