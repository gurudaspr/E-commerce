import React, { useEffect } from "react";
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
import { Link, replace, useNavigate } from "react-router-dom";
import useSignIn from '../../../hooks/useSignIn.js';
import { useAuthStore } from "../../../store/useAuthStore.js";

const LoginSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
});

function SignIn() {
    const navigate = useNavigate();
    const { role } = useAuthStore();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(LoginSchema),
    });
    const { signIn, isLoading, success } = useSignIn();

    useEffect(() => {
        if (success) {
            if (role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else if (role === 'user') {
                navigate('/user/home', { replace: true });
            }
        }
    }, [success, role, navigate]);

    const onSubmit = (data) => {
        signIn(data);
    };

    return (
        <section className="px-8">
            <div className="container mx-auto h-screen grid place-items-center">
                <Card
                    shadow={false}
                    className="md:px-24 md:py-14 py-8 border border-gray-300"
                >
                    <CardHeader shadow={false} floated={false} className="text-center">
                        <Typography
                            variant="h1"
                            color="blue-gray"
                            className="mb-4 !text-3xl lg:text-4xl"
                        >
                            Log In to Your Account
                        </Typography>
                        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                            Log in to access your account and manage your profile.
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
                            {/* Password Input */}
                            <div className="relative">
                                <Input
                                    size="lg"
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    placeholder="********"
                                    className="w-full"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className="absolute text-red-300 text-xs left-2">
                                        {errors.password.message}
                                    </span>
                                )}

                            </div>
                            <Typography variant="small" className="text-gray-600 text-xs text-right -my-3 ">
                                <Link to="/forgot-password" className="text-gray-900 font-semibold hover:text-red-400 ">Forgot your password?</Link>
                            </Typography>

                            {/* Submit Button */}
                            <Button type="submit" loading={isLoading} size="lg" color="gray" fullWidth>
                                Log In
                            </Button>
                            <div className="text-center mt-4">
                                <Typography variant="small">
                                    Don’t have an account? <Link to="/signup" className="text-gray-900 font-semibold">Sign up</Link>
                                </Typography>


                                <Typography
                                    variant="small"
                                    className="text-center mx-auto max-w-[19rem] mt-4 text-gray-600"
                                >
                                    By logging in, you agree to our{" "}
                                    <Link to="/terms-and-conditions" className="text-gray-900">
                                        Terms of Service
                                    </Link>{" "}
                                    &{" "}
                                    <Link to="/privacy-policy" className="text-gray-900">
                                        Privacy Policy.
                                    </Link>
                                </Typography>
                            </div>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

export default SignIn;
