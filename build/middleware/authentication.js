"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.renovateToken = exports.verifyAuthorization = void 0;
const index_utils_1 = require("../utils/index.utils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyAuthorization = (req, res, next, requiredRole) => {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; //authorization:'Bearer <token>'
    if (!token) {
        return (0, index_utils_1.errorLauncher)(req, res, [{ message: 'Access Denied, not logged or missing access token.' }], 401);
    }
    jsonwebtoken_1.default.verify(token, process.env.JWT_ACCESSTOKEN_SECRET, (err, user) => {
        if (err) {
            return (0, index_utils_1.errorLauncher)(req, res, [{ message: 'Access Denied, token incorrect or expired' }], 401);
        }
        const payload = user;
        if (!payload.roles.includes(requiredRole)) {
            return (0, index_utils_1.errorLauncher)(req, res, [{ message: 'Access Denied, you cannot see this content' }], 403);
        }
        req.user = payload;
        next();
    });
};
exports.verifyAuthorization = verifyAuthorization;
const renovateToken = (req, res) => {
    const refreshToken = req.headers['x-refresh-token'];
    if (!refreshToken) {
        return (0, index_utils_1.errorLauncher)(req, res, [{ message: 'Missing refresh token' }], 400);
    }
    jsonwebtoken_1.default.verify(refreshToken, process.env.JWT_REFRESHTOKEN_SECRET, (err, jwtpayload) => {
        if (err) {
            return (0, index_utils_1.errorLauncher)(req, res, [{ message: 'Refresh token incorrect or expired' }], 400);
        }
        const payload = jwtpayload;
        const user = {
            username: payload.username,
            name: payload.name,
            email: payload.email,
            profile_photo: payload.profile_photo,
            roles: payload.roles,
            preferences: payload.preferences
        };
        const new_access_token = (0, index_utils_1.generateAccessToken)(user);
        return (0, index_utils_1.successLauncher)(req, res, { newAccessToken: new_access_token }, 200);
    });
};
exports.renovateToken = renovateToken;
