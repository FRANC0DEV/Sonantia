import { Request, Response } from "express";

export const successLauncher = (_req:Request, res:Response, message:string='', status:number=200)=>{
    res.status(status).send(
        {
            error:false,
            status:status,
            body:message
        }
    )
};

export const errorLauncher = (_req:Request, res:Response, message:string='Error Interno', status:number=500)=>{
    res.status(status).send(
        {
            error:true,
            status:status,
            body:message
        }
    )
}