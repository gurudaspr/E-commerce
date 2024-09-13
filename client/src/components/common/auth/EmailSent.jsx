import React from "react";
import {
    Card,
    CardBody,
    CardHeader,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

function EmailSent() {
    return (
        <section className="px-8">
            <div className="container mx-auto h-screen grid place-items-center">
                <Card shadow={false} className="md:px-24 md:py-14 py-8 border border-gray-300 rounded-lg">
                    <CardHeader shadow={false} floated={false} className="text-center">
                        <Typography 
                            variant="h1" 
                            color="blue-gray" 
                            className="mb-6 text-4xl font-bold leading-tight">
                            Registration Successful!
                        </Typography>
                        <Typography 
                            className="text-gray-600 text-lg font-medium md:max-w-sm mx-auto">
                            Your registration was successful. Please check your email to verify your account.
                        </Typography>
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography 
                            className="mt-4 mb-6 text-gray-600 text-base font-normal">
                            If you don't see the verification email in your inbox, please check your spam folder.
                        </Typography>
                        <Link to="/login">
                            <Button color="gray" size="lg" >
                                Go to Login
                            </Button>
                        </Link>
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

export default EmailSent;
