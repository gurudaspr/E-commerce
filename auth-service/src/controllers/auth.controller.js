import User from '../models/user.model.js';
import argon2 from 'argon2';
import { client, verifyServiceSid } from '../config/twilio.js';
import sendOtp from  '../utils/sendOtp.js';

export const sendOtpToUser = async (req, res) => {
    const { mobile } = req.body;

    try {
        if (!mobile) {
            return res.status(400).json({ message: 'Mobile number is required' });
        }

        const otpStatus = await sendOtp(mobile);
        return res.status(200).json({ message: 'OTP sent successfully', otpStatus });

    } catch (err) {
        console.error('Error sending OTP', err);
        res.status(500).json({ message: 'Error sending OTP', error: err.message });
    }
};

export const verifyOtp = async (req, res) => {
    const { mobile, otp } = req.body;

    try {
        const verificationCheck = await client.verify.v2.services(verifyServiceSid)
            .verificationChecks
            .create({ to: mobile, code: otp });

        if (verificationCheck.status !== 'approved') {
            return res.status(400).json({ message: 'Invalid OTP or verification failed.' });
        }

        res.status(200).json({ message: 'OTP verified successfully' });

    } catch (err) {
        console.error('Error verifying OTP', err);
        res.status(500).json({ message: 'Error verifying OTP', error: err.message });
    }
};

export const register = async (req, res) => {
    const { name, email, password, confirmPassword, mobile } = req.body;

    try {
        if (!name || !email || !password || !confirmPassword || !mobile) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }

        // Proceed to save the user after OTP verification
        const hashedPassword = await argon2.hash(password);
        const newUser = new User({ name, email, password: hashedPassword, mobile });
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });

    } catch (err) {
        console.error('Error in registering user', err);
        res.status(500).json({ message: 'Error in registering user', error: err.message });
    }
};
