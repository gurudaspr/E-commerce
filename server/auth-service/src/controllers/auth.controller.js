import { generateEmailToken } from '../utils/generateEmailToken.js';
import User from '../models/user.model.js';
import sendVerificationEmail from '../utils/sendEmail.js';
import argon2 from 'argon2';
import { generateJwt } from '../utils/generateJwt.js';
import 'dotenv/config';



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

        const verificationUrl = `${process.env.EMAIL_VERIFICATION_LINK}/${verificationToken}`;

        const subject = 'Verify your email';
        const text = `Please click the link below to verify your email address.`;
        await sendVerificationEmail(email, verificationUrl, subject, text);

        res.status(200).send({ message: 'Registration successful, please check your email to verify your account' });

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
            return res.status(400).send({ message: 'Invalid or expired token' });
        }
        user.isVerified = true;
        user.verificationToken = undefined; // Remove the token once verified
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
        const token = generateJwt(user._id, user.role);
        res.status(200).json({
            message: 'Login successful',
            user: { name: user.name, email: user.email, role: user.role },
            token
        });
    }

    catch (error) {
        console.error('Error while logging in user', error);
        res.status(500).json({ message: 'Error while logging in user', error: error.message });
    }
}


export const changePassword = async (req, res) => {
    const { currentPassword, password, confirmPassword } = req.body;
    const userId = req.user.userId

    try {
        const user = await User.findOne({ _id: userId });
        if (!user) {
            return res.status(400).json({ message: 'Invalid user' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email first' });
        }
        if (!user.password) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }
        const isCurrentPassword = await argon2.verify(user.password, currentPassword);
        if (!isCurrentPassword) {
            return res.status(400).json({ message: 'Invalid current password' });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const hashedPassword = await argon2.hash(password);
        user.password = hashedPassword;
        await user.save();

        res.status(200).json({ message: 'Password changed successfully' });
    }
    catch (error) {
        console.error('Error while changing password', error);
        res.status(500).json({ message: 'Error while changing password', error: error.message });
    }
}

export const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'No user found with this email' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email first' });
        }
        const verificationToken = generateEmailToken();
        user.verificationToken = verificationToken;
        await user.save();
        const verificationUrl = `${process.env.RESET_PASSWORD_LINK}/${verificationToken}`
        const subject = 'Reset your password';
        const text = `Please click the link below to reset your password.`;
        await sendVerificationEmail(email, verificationUrl, subject, text);
        res.status(200).send({message: 'Password reset email sent successfully'});
    }
    catch (error) {
        console.error('Error sending password reset email', error);
        res.status(500).json({ message: 'Error sending password reset email', error: error.message });
    }
}

// export const resetPasswordverify = async (req, res) => {
//     const { token } = req.params;
//     try {
//         const user = await User.findOne({ verificationToken: token });
//         if (!user) {
//             return res.status(400).send({ message: 'Invalid token' });
//         }
//         user.isVerified = true;
//         user.verificationToken = undefined; // Remove the token once verified
//         await user.save();

//         res.status(200).send('Email verified successfully');
//     }
//     catch (error) {
//         console.error('Error verifying email', error);
//         res.status(500).json({ message: 'Error verifying email', error: error.message });
//     }
// }


export const resetPassword = async (req, res) => {
    const { token, newPassword, confirmNewPassword } = req.body;

    try {
        // Find the user with the verification token
        const user = await User.findOne({ verificationToken: token });

        if (!user) {
            return res.status(400).json({ message: 'Error resetting password' });
        }
        if (!user.isVerified) {
            return res.status(400).json({ message: 'Please verify your email first' });
        }
        if (newPassword !== confirmNewPassword) {
            return res.status(400).json({ message: 'Passwords do not match' });
        }
        const hashedPassword = await argon2.hash(newPassword);
        user.password = hashedPassword;
        user.verificationToken = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (error) {
        console.error('Error resetting password', error);
        res.status(500).json({ message: 'Error resetting password', error: error.message });
    }
};