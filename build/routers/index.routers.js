"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genreRouter = exports.listenerRouter = exports.songRouter = exports.artistRouter = exports.userRouter = void 0;
const users_1 = __importDefault(require("./users"));
exports.userRouter = users_1.default;
const artists_1 = __importDefault(require("./artists"));
exports.artistRouter = artists_1.default;
const songs_1 = __importDefault(require("./songs"));
exports.songRouter = songs_1.default;
const listeners_1 = __importDefault(require("./listeners"));
exports.listenerRouter = listeners_1.default;
const genres_1 = __importDefault(require("./genres"));
exports.genreRouter = genres_1.default;
//creating swagger security component
/**
 * @swagger
 * components:
 *   securitySchemes:
 *     bearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 */ 
