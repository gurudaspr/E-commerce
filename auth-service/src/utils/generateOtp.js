import crypto from 'crypto';

// Function to generate a 6-digit numeric OTP
const generateOtp = () => {
    const otp = crypto.randomInt(1000, 9999); // Generate a random integer between 1000 and 9999
    return otp.toString(); // Convert the number to a string
}

export default generateOtp;
