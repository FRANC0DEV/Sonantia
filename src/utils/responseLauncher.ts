import { Request, Response } from "express";
import { errResponse } from "../interfaces/errorModels";
export const successLauncher = (_req:Request, res:Response, message:any='', status:number=200)=>{
    res.setHeader('Content-Type','application/json')
    res.status(status).send(
        {
            error:false,
            status:status,
            body:message
        }
    )
};

export const errorLauncher = (_req:Request, res:Response, resErrors:errResponse[]=[{message: 'Internal Error. Try again later...'}], status:number=500)=>{
    res.setHeader('Content-Type','application/json')
    res.status(status).send(
        {
            error:true,
            status:status,
            errors:resErrors
        }
    )
}