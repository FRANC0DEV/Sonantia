import { NextFunction, Response , Request} from "express";
import { errorLauncher } from "../utils/index.utils";
import { userTokenInfo } from "../interfaces/userInterfaces";
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
        const payload = user as userTokenInfo;
        if(!payload.roles.includes(requiredRole)){
            return errorLauncher(req,res,[{message:'Access Denied, you cannot see this content'}],403);
        }
        req.user = payload;
        next();
    });
}