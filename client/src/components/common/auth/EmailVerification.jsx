import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import axios from "axios";
import toast from "react-hot-toast";

function EmailVerification() {
    const { token } = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        const verifyEmail = async () => {
            try {
                const response = await axios.get('/api/v1/auth/verify-email', {
                    params: { token }
                });

                setSuccess(true);
                toast.success("Email verified successfully!");
            } catch (err) {
                console.log(err);
                setError(err.response?.data?.message || 'Email verification failed. Please try again.');
                toast.error("Email verification failed. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        verifyEmail();
    }, [token]);

    return (
        <section className="px-8">
            <div className="container mx-auto h-screen grid place-items-center">
                <Card shadow={false} className="md:px-24 md:py-14 py-8 border border-gray-300">
                    <CardHeader shadow={false} floated={false} className="text-center">
                        <Typography variant="h1" color="blue-gray" className="mb-4 !text-3xl lg:text-4xl">
                            {isLoading ? "Verifying..." : success ? "Verification Successful!" : "Verification Failed"}
                        </Typography>
                        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                            {isLoading ? "Please wait while we verify your email." : success ? "Your email has been successfully verified." : error}
                        </Typography>
                    </CardHeader>
                    <CardBody className="text-center">
                        {!isLoading && (
                            <Button color="gray" size="lg" onClick={() => window.location.href = '/login'}>
                                Go to Login
                            </Button>
                        )}
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

export default EmailVerification;