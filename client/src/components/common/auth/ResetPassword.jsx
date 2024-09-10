import React, { useEffect, useState } from "react";
import {
    Card,
    Input,
    Button,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../../config/axios";
import toast from "react-hot-toast";

// Validation schema using Yup
const ResetPasswordSchema = Yup.object().shape({
    newPassword: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("New password is required"),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref("newPassword")], "Passwords must match")
        .required("Please confirm your new password"),
});

function ResetPassword() {
    const { token } = useParams(); // get token from the URL
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ResetPasswordSchema),
    });
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        console.log(data, 'data');
        try {
            setIsLoading(true);
            const response = await axiosInstance.post(`/auth/reset-password`, {
                token,
                ...data,
            });
            toast.success(response.data.message);
            navigate('/login');
            setIsLoading(false);
        } catch (error) {
            toast.error(error?.response?.data?.message || 'Error resetting password');
            setIsLoading(false);
        }
    };

    return (
        <section className="px-8">
            <div className="container mx-auto h-screen grid place-items-center">
                <Card shadow={false} className="md:px-24 md:py-14 py-8 border border-gray-300">
                    <CardHeader shadow={false} floated={false} className="text-center">
                        <Typography
                            variant="h1"
                            color="blue-gray"
                            className="mb-4 !text-3xl lg:text-4xl"
                        >
                            Reset Your Password
                        </Typography>
                        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                            Enter your new password below.
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            {/* New Password */}
                            <div className="relative">
                                <Input
                                    size="lg"
                                    variant="outlined"
                                    label="New Password"
                                    type="password"
                                    placeholder="Enter new password"
                                    className="w-full"
                                    {...register("newPassword")}
                                />
                                {errors.newPassword && (
                                    <span className="absolute text-red-300 text-xs left-2">
                                        {errors.newPassword.message}
                                    </span>
                                )}
                            </div>

                            {/* Confirm New Password */}
                            <div className="relative">
                                <Input
                                    size="lg"
                                    variant="outlined"
                                    label="Confirm New Password"
                                    type="password"
                                    placeholder="Re-enter new password"
                                    className="w-full"
                                    {...register("confirmNewPassword")}
                                />
                                {errors.confirmNewPassword && (
                                    <span className="absolute text-red-300 text-xs left-2">
                                        {errors.confirmNewPassword.message}
                                    </span>
                                )}
                            </div>

                            {/* Reset Button */}
                            <Button type="submit" size="lg" color="gray" fullWidth loading={isLoading}>
                                Reset Password
                            </Button>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

export default ResetPassword;
