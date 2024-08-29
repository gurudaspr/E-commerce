import nodemailer from 'nodemailer';
import 'dotenv/config';

const transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail'
    auth: {
        user: process.env.FROM_MAIL_ID,
        pass: process.env.FROM_MAIL_PASSWORD
    }
});

export default function sendVerificationEmail(to, verificationUrl,subject,text) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: to,
        subject: subject,
        text: `${text} ${verificationUrl}`,
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