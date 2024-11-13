import { MulterError } from "multer";
import { errorLauncher } from "./responseLauncher";
import { ZodError } from "zod";
import { Request, Response, NextFunction } from "express";
export const errorHandler = (err: unknown, req: Request, res: Response, _next: NextFunction) => {
    if (err instanceof MulterError) {
      errorLauncher(req, res, `${err.code}: ${err.field}`, 400);
    } else if (err instanceof ZodError) {
      const errorDetails = err.errors.map(e => ({
        path: e.path,
        message: e.message,
      }));
      errorLauncher(req, res, JSON.stringify(errorDetails), 400);
    } else if (err instanceof Error) {
      errorLauncher(req, res, err.message, 400);
    } else {
      console.error('Unexpected error:', err);
      errorLauncher(req, res, 'An unexpected error occurred', 500);
    }
}