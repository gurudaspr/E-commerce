import nodemailer from 'nodemailer';
import 'dotenv/config';

// Create the transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.FROM_MAIL_ID,
        pass: process.env.FROM_MAIL_PASSWORD
    }
});

// Function to send registration verification email
export function sendVerificationEmail(to, verificationUrl) {
    const subject = "Welcome to Zestamart - Verify Your Email";
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center; padding: 10px;">
                <h1 style="color: #ff6600;">Zestamart</h1>
                <p style="font-size: 18px;">Your All-in-One Shopping Solution!</p>
            </div>
            <h2>Welcome to Zestamart!</h2>
            <p>Thank you for registering with us. Please verify your email by clicking the link below to complete your registration:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${verificationUrl}" style="background-color: #28a745; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">Verify Email</a>
            </div>
            <p>If you didn’t register at Zestamart, please ignore this email.</p>
            <p>Thanks, <br> The Zestamart Team</p>
            <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777;">
                <p>Zestamart - Your Fashion, Your Way!</p>
                <p style="font-size: 12px; color: #aaa;">© 2024 Zestamart, All rights reserved.</p>
            </footer>
        </div>
    `;

    const mailOptions = {
        from: process.env.FROM_MAIL_ID,
        to: to,
        subject: subject,
        html: htmlContent
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}
// Function to send password reset email
export function sendPasswordResetEmail(to, resetUrl) {
    const subject = "Reset Your Zestamart Password";
    const htmlContent = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; color: #333; border: 1px solid #e0e0e0; border-radius: 8px;">
            <div style="text-align: center; padding: 10px;">
                <h1 style="color: #ff6600;">Zestamart</h1>
                <p style="font-size: 18px;">Your All-in-One Shopping Solution!</p>
            </div>
            <h2>Reset Your Password</h2>
            <p>We received a request to reset your password for your Zestamart account. Please click the link below to reset your password:</p>
            <div style="text-align: center; margin: 20px 0;">
                <a href="${resetUrl}" style="background-color: #dc3545; color: white; padding: 12px 24px; border-radius: 5px; text-decoration: none; font-weight: bold;">Reset Password</a>
            </div>
            <p>If you didn’t request a password reset, please ignore this email.</p>
            <p>Thanks, <br> The Zestamart Team</p>
            <footer style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #e0e0e0; font-size: 12px; color: #777;">
                <p>Zestamart - Your Fashion, Your Way!</p>
                <p style="font-size: 12px; color: #aaa;">© 2024 Zestamart, All rights reserved.</p>
            </footer>
        </div>
    `;

    const mailOptions = {
        from: process.env.FROM_MAIL_ID,
        to: to,
        subject: subject,
        html: htmlContent
    };

    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return reject(error);
            }
            resolve(info);
        });
    });
}