import { Request, Response, NextFunction } from 'express';
import { getGenres, successLauncher } from '../utils/index.utils'
export const obtainGenres = async (req:Request,res:Response,next:NextFunction)=>{
    try {
        const genres  = await getGenres();
        successLauncher(req,res,genres,200);
    } catch (error) {
        next(error);
    }
}