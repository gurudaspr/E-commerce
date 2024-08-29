
import crypto from 'crypto';
export function generateEmailToken(length = 32) {
    return crypto.randomBytes(length).toString('hex');
}
