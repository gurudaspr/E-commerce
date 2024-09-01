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
                <Card shadow={false} className="md:px-24 md:py-14 py-8 border border-gray-300">
                    <CardHeader shadow={false} floated={false} className="text-center">
                        <Typography variant="h1" color="blue-gray" className="mb-4 !text-3xl lg:text-4xl">
                            Registration Successful!
                        </Typography>
                        <Typography className="!text-gray-600 text-[18px] font-normal md:max-w-sm">
                            Your registration was successful. Please check your email to verify your account.
                        </Typography>
                    </CardHeader>
                    <CardBody className="text-center">
                        <Typography className="mb-4 !text-gray-600 text-[16px] font-normal">
                            If you don't see the verification email in your inbox, please check your spam folder.
                        </Typography>
                        <Link to="/login">
                            <Button color="gray" size="lg">
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