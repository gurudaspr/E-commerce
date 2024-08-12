import { client, verifyServiceSid } from '../config/twilio.js';

async function sendOtp(phoneNumber) {
  try {
    const verification = await client.verify.services(verifyServiceSid)
      .verifications
      .create({ to: phoneNumber, channel: 'sms' });
    return verification.status; // 'pending' if successfully sent
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
}

export default sendOtp;