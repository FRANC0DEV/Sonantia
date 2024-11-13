import { MulterError } from "multer";
import { errorLauncher } from "./responseLauncher";
import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof MulterError) {
      errorLauncher(req, res, [{message:`${err.field}`}], 400);
    } else if (err instanceof ZodError) {
      const errorDetails = err.errors.map(e => ({
        message: e.code==="invalid_type"?`you must send a ${e.path}`:e.message,
      }));
      errorLauncher(req, res, errorDetails, 400);
    } else if (err instanceof Error) {
      errorLauncher(req, res, [{message: err.message}], 400);
    } else {
      console.error('Unexpected error:', err);
      errorLauncher(req, res, [{message:'An unexpected error occurred'}], 500);
    }
}