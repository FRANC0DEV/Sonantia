import jwt from 'jsonwebtoken';
import { userTokenInfo } from '../interfaces/userInterfaces';
import dotenv from 'dotenv';
dotenv.config();
export const generateAccessToken = (userInfo:userTokenInfo)=>{
    try {
        return jwt.sign(
            userInfo,
            process.env.JWT_ACCESSTOKEN_SECRET as string,
            {
                expiresIn: '15m',/*only for testing, this token must endure for at least 15m */
            }
        )
    } catch (error) {
        console.log('Error while generating the access token: ', error)
        throw new Error('Something wrong happened, try again later...');
    }
}

export const generateRefreshToken = (userInfo:userTokenInfo)=>{
    try {
        return jwt.sign(
            userInfo,
            process.env.JWT_REFRESHTOKEN_SECRET as string,
            {
                expiresIn:'7d'
            }
        )
    } catch (error) {
        console.log('Error while generating the refresh token: ', error)
        throw new Error('Something wrong happened, try again later...');
    }
}