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
import { Link, useNavigate } from "react-router-dom";
import useSignup from '../../../hooks/useSignup.js';
import toast from "react-hot-toast";

const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match')
});

function Signup() {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(SignupSchema),
    });
    const { signup, isLoading, success } = useSignup();

    useEffect(() => {
        if (success) {
            navigate('/email-sent');
        }
    }, [success, navigate]);

    const onSubmit = (data) => {
        signup(data);
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
                            Create Your Account
                        </Typography>
                        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                            Sign up to enjoy exclusive offers and a personalized experience.
                        </Typography>
                    </CardHeader>
                    <CardBody>
                        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
                            {/* Name Input */}
                            <div className="relative">
                                <Input
                                    variant="outlined"
                                    label="Name"
                                    placeholder="John Doe"
                                    className="w-full"
                                    {...register("name")}
                                />
                                {errors.name && (
                                    <span className="absolute text-red-300 text-xs  left-2">
                                        {errors.name.message}
                                    </span>
                                )}
                            </div>
                            {/* Email Input */}
                            <div className="relative">
                                <Input
                                    variant="outlined"
                                    label="Email"
                                    type="email"
                                    placeholder="name@mail.com"
                                    className="w-full"
                                    {...register("email")}
                                />
                                {errors.email && (
                                    <span className="absolute text-red-300 text-xs  left-2">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>
                            {/* Password Input */}
                            <div className="relative">
                                <Input
                                    variant="outlined"
                                    label="Password"
                                    type="password"
                                    placeholder="********"
                                    className="w-full"
                                    {...register("password")}
                                />
                                {errors.password && (
                                    <span className="absolute text-red-300 text-xs  left-2">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>
                            {/* Confirm Password Input */}
                            <div className="relative">
                                <Input
                                    variant="outlined"
                                    label="Confirm Password"
                                    type="password"
                                    placeholder="********"
                                    className="w-full"
                                    {...register("confirmPassword")}
                                />
                                {errors.confirmPassword && (
                                    <span className="absolute text-red-300 text-xs  left-2">
                                        {errors.confirmPassword.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <Button type="submit" loading={isLoading} size="lg" color="gray" fullWidth>
                                Sign Up
                            </Button>

                            <Typography
                                variant="small"
                                className="text-center mx-auto max-w-[19rem] !font-medium !text-gray-600"
                            >
                                By signing up, you agree to our{" "}
                                <Link to="/terms-and-conditions" className="text-gray-900">
                                    Terms of Service
                                </Link>{" "}
                                &{" "}
                                <Link to="/privacy-policy" className="text-gray-900">
                                    Privacy Policy.
                                </Link>
                            </Typography>
                        </form>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

export default Signup;
