import React, { useState } from "react";
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
import { Link } from "react-router-dom";
import axiosInstance from "../../../config/axios";
import toast from "react-hot-toast";

const ForgotPasswordSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
});

function ForgotPassword() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ForgotPasswordSchema),
    });
    const [isLoading, setIsLoading] = useState(false);

    const onSubmit = async (data) => {
        try {
            setIsLoading(true);
            const response = await axiosInstance.post('/auth/forgot-password', data);
            toast.success(response.data.message);
            setIsLoading(false);
        }
        catch (error) {
            toast.error(error?.response?.data?.message);
            setIsLoading(false);
        }
        finally {
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
                            Forgot Your Password?
                        </Typography>
                        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                            Enter your email below, and we'll send you a reset link.
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                            {/* Email Input */}
                            <div className="relative">
                                <Input
                                    size="lg"
                                    variant="outlined"
                                    label="Email"
                                    type="email"
                                    placeholder="name@mail.com"
                                    className="w-full"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="absolute text-red-300 text-xs left-2">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* Send Reset Link Button */}
                            <Button type="submit" size="lg" color="gray" fullWidth loading={isLoading}>
                                Send Reset Link
                            </Button>
                            <div className="text-center mt-4">
                                <Typography variant="small">
                                    Remember your password? <Link to="/login" className="text-gray-900 font-semibold">Log In</Link>
                                </Typography>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

export default ForgotPassword;
