import { NextFunction, Response , Request} from "express";
import { errorLauncher,generateAccessToken, successLauncher } from "../utils/index.utils";
import { userPayload, userTokenInfo } from "../interfaces/userInterfaces";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
dotenv.config();
type role = ('Listener'|'Artist');
export const verifyAuthorization = (req:Request, res:Response, next:NextFunction, requiredRole:role)=>{
    const token = req.headers['authorization']?.split(' ')[1];//authorization:'Bearer <token>'
    if(!token){
        return errorLauncher(req, res, [{message:'Access Denied, not logged or missing access token.'}],401);
    } 
    jwt.verify(token,process.env.JWT_ACCESSTOKEN_SECRET as string, (err, user)=>{
        if(err){
            return errorLauncher(req,res,[{message:'Access Denied, token incorrect or expired'}],401);
        }
        const payload = user as userPayload;
        if(!payload.roles.includes(requiredRole)){
            return errorLauncher(req,res,[{message:'Access Denied, you cannot see this content'}],403);
        }
        req.user = payload;
        next();
    });//dajnusainjda 
    //adsasdsasda
    // la ptmr como se q
    //amsduahbdjsiaugv hdjoiahudvbjnabhd vnasjkibkmspfjd kcxzdjdc
}

export const renovateToken = (req:Request, res:Response)=>{
    const refreshToken =  req.headers['x-refresh-token'] as string;
    if (!refreshToken) {
        return errorLauncher(req,res,[{message:'Missing refresh token'}],400);
    }
    jwt.verify(refreshToken,process.env.JWT_REFRESHTOKEN_SECRET as string,(err, jwtpayload)=>{
        if(err){
            return errorLauncher(req,res,[{message:'Refresh token incorrect or expired'}],400);
        }
        const payload = jwtpayload as userPayload;
        const user:userTokenInfo = {
            username:payload.username,
            name:payload.name,
            email:payload.email,
            profile_photo:payload.profile_photo,
            roles:payload.roles,
            preferences:payload.preferences
        };
        const new_access_token = generateAccessToken(user);
        return successLauncher(req,res,{newAccessToken:new_access_token},200);
    })
}