import { generateEmailToken } from '../utils/generateEmailToken.js';
import User from '../models/user.model.js';
import sendVerificationEmail from '../utils/sendEmail.js';
import argon2 from 'argon2';



export const register = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;
    try {
        if (!name || !email || !password || !confirmPassword) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }
        const emailExist = await User.findOne({ email });
        if (emailExist) {
            return res.status(400).json({ message: 'User with this email already exists' });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const hashedPassword = await argon2.hash(password);
        const verificationToken = generateEmailToken();
        const newUser = new User({ name, email, password: hashedPassword, verificationToken });
        await newUser.save();

        const verificationUrl = `http://localhost:5001/auth/verify-email?token=${verificationToken}`;
        const subject = 'Verify your email';
        const text = `Please click the link below to verify your email address.`;
        await sendVerificationEmail(email, verificationUrl, subject, text);

        res.status(200).send('Registration successful, please check your email to verify your account');

    } catch (error) {
        console.error('Error in registering user', error);
        res.status(500).json({ message: 'Error in registering user', error: error.message });

    }
}
export const verifyEmail = async (req, res) => {
    const { token } = req.query;
    try {
        const user = await User.findOne({ verificationToken: token });
        if (!user) {
            return res.status(400).send('Invalid or expired token');
        }

        user.isVerified = true;
        user.verificationToken = null; // Remove the token once verified
        await user.save();

        res.status(200).send('Email verified successfully');
    }
    catch (error) {
        console.error('Error verifying email', error);
        res.status(500).json({ message: 'Error verifying email', error: error.message });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email first' });
        }
        if (!user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const isPasswordCorrect = await argon2.verify(user.password, password);
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        res.status(200).json({ message: 'Login successful', user });
    }

    catch (error) {
        console.error('Error while logging in user', error);
        res.status(500).json({ message: 'Error while logging in user', error: error.message });
    }
}
