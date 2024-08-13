import jwt from 'jsonwebtoken';


export const generateJwt = (userId , role) => {
    const payload = {
        userId,
        role
    };
    return jwt.sign(payload, process.env.JWT_SECRET);
}