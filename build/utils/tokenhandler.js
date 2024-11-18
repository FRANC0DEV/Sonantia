"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const generateAccessToken = (userInfo) => {
    try {
        return jsonwebtoken_1.default.sign(userInfo, process.env.JWT_ACCESSTOKEN_SECRET, {
            expiresIn: '15m', /*only for testing, this token must endure for at least 15m */
        });
    }
    catch (error) {
        console.log('Error while generating the access token: ', error);
        throw new Error('Something wrong happened, try again later...');
    }
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (userInfo) => {
    try {
        return jsonwebtoken_1.default.sign(userInfo, process.env.JWT_REFRESHTOKEN_SECRET, {
            expiresIn: '7d'
        });
    }
    catch (error) {
        console.log('Error while generating the refresh token: ', error);
        throw new Error('Something wrong happened, try again later...');
    }
};
exports.generateRefreshToken = generateRefreshToken;
