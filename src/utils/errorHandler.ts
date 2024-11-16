import { MulterError } from "multer";
import { errorLauncher } from "./responseLauncher";
import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
import { QueryError } from "mysql2";
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof MulterError) {
      errorLauncher(req, res, [{message:`${err.field}`}], 400);
    } 
    else if (err instanceof ZodError) {
      const errorDetails = err.errors.map(e => ({
        message: e.code==="invalid_type"?`you must send a ${e.path}`:e.message,
      }));
      errorLauncher(req, res, errorDetails, 400);
    } 
    else if (err && typeof err === 'object' && 'code' in err && 'errno' in err && 'sqlState' in err && 'message' in err) {//SQL error
      const queryErr = err as QueryError;
      if (queryErr.sqlState!=='45000'){
        errorLauncher(req,res);
      }
      else{
        const errBody = queryErr.message.split('/').filter((str)=>str!=="").map((e)=>({message:e}));
        errorLauncher(req,res,errBody,400);
      }
    }
    else if (err instanceof Error) {
      errorLauncher(req, res, [{message: err.message}], 500);
    } 
    else {
      console.error('Unexpected error:', err);
      errorLauncher(req, res, [{message:'An unexpected error occurred'}], 500);
    }
    console.log(err);
}