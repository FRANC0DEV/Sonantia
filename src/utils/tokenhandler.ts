import jwt from 'jsonwebtoken';
import { userTokenInfo } from '../interfaces/userModels';
import dotenv from 'dotenv';
dotenv.config();
export const generateAccessToken = (userInfo:userTokenInfo)=>{
    return jwt.sign(
        userInfo,
        process.env.JWT_ACCESSTOKEN_SECRET as string,
        {
            expiresIn: '2m',/*only for testing, this token must endure for at least 15m */
        }
    )
}

export const generateRefreshToken = (userInfo:userTokenInfo)=>{
    return jwt.sign(
        userInfo,
        process.env.JWT_REFRESHTOKEN_SECRET as string,
        {
            expiresIn:'7d'
        }
    )
}