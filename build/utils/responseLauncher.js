"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorLauncher = exports.successLauncher = void 0;
const successLauncher = (_req, res, message = '', status = 200) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(status).send({
        error: false,
        status: status,
        body: message
    });
};
exports.successLauncher = successLauncher;
const errorLauncher = (_req, res, resErrors = [{ message: 'Internal Error. Try again later...' }], status = 500) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(status).send({
        error: true,
        status: status,
        errors: resErrors
    });
};
exports.errorLauncher = errorLauncher;
