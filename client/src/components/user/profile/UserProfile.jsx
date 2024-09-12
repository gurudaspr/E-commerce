import React, { useEffect, useState } from "react";
import {
    Card,
    Input,
    Button,
    CardBody,
    CardHeader,
    Typography,
} from "@material-tailwind/react";
import Avatar from 'react-avatar';
import { PencilIcon } from "@heroicons/react/24/outline";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import axiosInstance from "../../../config/axios";
import toast from "react-hot-toast";
import { useUserStore } from '../../../store/useUserStore';
import * as Yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// Yup schema for name validation
const nameSchema = Yup.object().shape({
    name: Yup.string()
        .required('Name is required')
        .min(2, 'Name must be at least 2 characters')
        .max(50, 'Name must not exceed 50 characters')
});

// Yup schema for password change
const passwordSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current password is required'),
    newPassword: Yup.string()
        .required('New password is required')
        .min(6, 'Password must be at least 6 characters'),
    confirmNewPassword: Yup.string()
        .oneOf([Yup.ref('newPassword'), null], 'Passwords must match')
        .required('Confirm password is required')
});

// Function to fetch user profile data
const fetchUserProfile = async () => {
    try {
        const response = await axiosInstance.get('/user/profile');
        return response.data.user;
    } catch (error) {
        console.error('Error fetching user profile', error);
        toast.error('Error fetching user profile');
        return { name: '', email: '' };
    }
};

function UserProfile() {
    const [profileData, setProfileData] = useState({ name: '', email: '' });
    const [isEditing, setIsEditing] = useState(false);
    const [showPasswordFields, setShowPasswordFields] = useState(false);
    const setUser = useUserStore(state => state.setUser);

    // State for toggling password visibility
    const [currentPasswordShown, setCurrentPasswordShown] = useState(false);
    const [newPasswordShown, setNewPasswordShown] = useState(false);
    const [confirmNewPasswordShown, setConfirmNewPasswordShown] = useState(false);

    const { register: registerName, handleSubmit: handleNameSubmit, formState: { errors: nameErrors }, setValue: setNameValue, reset: resetNameForm } = useForm({
        resolver: yupResolver(nameSchema),
    });

    const { register: registerPassword, handleSubmit: handlePasswordSubmit, formState: { errors: passwordErrors }, reset: resetPasswordForm } = useForm({
        resolver: yupResolver(passwordSchema),
    });

    useEffect(() => {
        const loadProfileData = async () => {
            const userProfile = await fetchUserProfile();
            setProfileData(userProfile);
            setNameValue("name", userProfile.name);
        };

        loadProfileData();
    }, [setNameValue]);

    const onNameSubmit = async (data) => {
        try {
            await axiosInstance.patch('/user/profile', { name: data.name });
            setProfileData((prev) => ({ ...prev, name: data.name }));
            setUser(data.name, profileData.email);
            setIsEditing(false);
            resetNameForm();
            toast.success('Profile updated successfully');
        } catch (error) {
            toast.error('Error updating profile name');
        }
    };

    const onPasswordSubmit = async (data) => {
        try {
            const response = await axiosInstance.post('/auth/change-password', data);
            setShowPasswordFields(false);
            resetPasswordForm();
            toast.success(response.data.message);
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    };

    const togglePasswordFields = () => {
        setShowPasswordFields(!showPasswordFields);
        if (showPasswordFields) {
            resetPasswordForm();
        }
    };

    return (
        <section className="px-4 sm:px-8 flex items-center justify-center min-h-screen">
            <div className="w-full max-w-md">
                <Card
                    shadow={false}
                    className="px-4 py-8 sm:px-6 sm:py-10 md:px-8 md:py-12 border border-gray-300"
                >
                    <CardHeader shadow={false} floated={false} className="text-center">
                        <Avatar
                            name={profileData.name.charAt(0).toUpperCase()}
                            size="80"
                            round={true}
                            color="#000000"
                            textSizeRatio={2}
                            className="mx-auto mb-4"
                        />
                        <div className="flex flex-col items-center justify-center">
                            {isEditing ? (
                                <form onSubmit={handleNameSubmit(onNameSubmit)} className="w-full max-w-xs mb-4">
                                    <div className="relative">
                                        <Input
                                            size="lg"
                                            variant="outlined"
                                            label="Name"
                                            className="w-full"
                                            {...registerName("name")}
                                        />
                                        {nameErrors.name && (
                                            <span className="absolute text-red-300 text-xs left-2">
                                                {nameErrors.name.message}
                                            </span>
                                        )}
                                    </div>
                                    <Button type="submit" size="sm" color="gray" className="mt-2">
                                        Save
                                    </Button>
                                </form>
                            ) : (
                                <div className="flex items-center justify-center mb-4">
                                    <Typography
                                        variant="h1"
                                        color="blue-gray"
                                        className="text-2xl sm:text-3xl lg:text-4xl uppercase"
                                    >
                                        {profileData.name}
                                    </Typography>
                                    <button
                                        className="ml-2"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        <PencilIcon className="h-5 w-5 text-gray-600 cursor-pointer" />
                                    </button>
                                </div>
                            )}
                            <Typography className="!text-gray-600 text-base sm:text-lg font-normal break-all">
                                {profileData.email}
                            </Typography>
                        </div>
                    </CardHeader>
                    <CardBody>
                        <Button
                            size="lg"
                            color="gray"
                            fullWidth
                            onClick={togglePasswordFields}
                        >
                            {showPasswordFields ? 'Cancel' : 'Change Password'}
                        </Button>
                        {showPasswordFields && (
                            <form onSubmit={handlePasswordSubmit(onPasswordSubmit)} className="flex flex-col gap-5 mt-4">
                                <div className="relative">
                                    <Input
                                        size="lg"
                                        variant="outlined"
                                        label="Current Password"
                                        type={currentPasswordShown ? "text" : "password"}
                                        className="w-full"
                                        {...registerPassword("currentPassword")}
                                        icon={
                                            <i onClick={() => setCurrentPasswordShown(!currentPasswordShown)}>
                                                {currentPasswordShown ? (
                                                    <EyeIcon className="h-5 w-5" />
                                                ) : (
                                                    <EyeSlashIcon className="h-5 w-5" />
                                                )}
                                            </i>
                                        }
                                    />
                                    {passwordErrors.currentPassword && (
                                        <span className="absolute text-red-300 text-xs left-2">
                                            {passwordErrors.currentPassword.message}
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        size="lg"
                                        variant="outlined"
                                        label="New Password"
                                        type={newPasswordShown ? "text" : "password"}
                                        className="w-full"
                                        {...registerPassword("newPassword")}
                                        icon={
                                            <i onClick={() => setNewPasswordShown(!newPasswordShown)}>
                                                {newPasswordShown ? (
                                                    <EyeIcon className="h-5 w-5" />
                                                ) : (
                                                    <EyeSlashIcon className="h-5 w-5" />
                                                )}
                                            </i>
                                        }
                                    />
                                    {passwordErrors.newPassword && (
                                        <span className="absolute text-red-300 text-xs left-2">
                                            {passwordErrors.newPassword.message}
                                        </span>
                                    )}
                                </div>
                                <div className="relative">
                                    <Input
                                        size="lg"
                                        variant="outlined"
                                        label="Confirm New Password"
                                        type={confirmNewPasswordShown ? "text" : "password"}
                                        className="w-full"
                                        {...registerPassword("confirmNewPassword")}
                                        icon={
                                            <i onClick={() => setConfirmNewPasswordShown(!confirmNewPasswordShown)}>
                                                {confirmNewPasswordShown ? (
                                                    <EyeIcon className="h-5 w-5" />
                                                ) : (
                                                    <EyeSlashIcon className="h-5 w-5" />
                                                )}
                                            </i>
                                        }
                                    />
                                    {passwordErrors.confirmNewPassword && (
                                        <span className="absolute text-red-300 text-xs left-2">
                                            {passwordErrors.confirmNewPassword.message}
                                        </span>
                                    )}
                                </div>
                                <Button type="submit" size="lg" color="gray" fullWidth>
                                    Update Password
                                </Button>
                            </form>
                        )}
                    </CardBody>
                </Card>
            </div>
        </section>
    );
}

export default UserProfile;