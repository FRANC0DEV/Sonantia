"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const multer_1 = require("multer");
const responseLauncher_1 = require("./responseLauncher");
const zod_1 = require("zod");
const errorHandler = (err, req, res, _next) => {
    if (err instanceof multer_1.MulterError) {
        (0, responseLauncher_1.errorLauncher)(req, res, [{ message: `${err.field}` }], 400);
    }
    else if (err instanceof zod_1.ZodError) {
        const errorDetails = err.errors.map(e => ({
            message: e.code === "invalid_type" ? `you must send a ${e.path}` : e.message,
        }));
        (0, responseLauncher_1.errorLauncher)(req, res, errorDetails, 400);
    }
    else if (err && typeof err === 'object' && 'code' in err && 'errno' in err && 'sqlState' in err && 'message' in err) { //SQL error
        const queryErr = err;
        if (queryErr.sqlState !== '45000') {
            (0, responseLauncher_1.errorLauncher)(req, res);
        }
        else {
            const errBody = queryErr.message.split('/').filter((str) => str !== "").map((e) => ({ message: e }));
            (0, responseLauncher_1.errorLauncher)(req, res, errBody, 400);
        }
    }
    else if (err instanceof Error) {
        (0, responseLauncher_1.errorLauncher)(req, res, [{ message: err.message }], 500);
    }
    else {
        console.error('Unexpected error:', err);
        (0, responseLauncher_1.errorLauncher)(req, res, [{ message: 'An unexpected error occurred' }], 500);
    }
    console.log(err);
};
exports.errorHandler = errorHandler;
