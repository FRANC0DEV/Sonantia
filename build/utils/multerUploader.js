"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audioUploader = exports.imgUploader = void 0;
const multer_1 = __importStar(require("multer"));
const path_1 = __importDefault(require("path"));
const imgStorage = multer_1.default.diskStorage({
    destination: path_1.default.resolve(__dirname, '../../temp/img'), /*we are in proyect/src/middleware/middleware.ts*/
    filename: (_req, _file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix);
    },
});
exports.imgUploader = (0, multer_1.default)({
    storage: imgStorage,
    fileFilter: (_req, file, callback) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'Unexpected file, (jpg,jpeg,png) files only accepted'));
        }
    }
});
const audioStorage = multer_1.default.diskStorage({
    destination: path_1.default.resolve(__dirname, '../../temp/audio'),
    filename: (_req, _file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        callback(null, uniqueSuffix);
    },
});
exports.audioUploader = (0, multer_1.default)({
    storage: audioStorage,
    fileFilter: (_req, file, callback) => {
        const allowedTypes = ['audio/mp3'];
        if (allowedTypes.includes(file.mimetype)) {
            callback(null, true);
        }
        else {
            callback(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'Unexpected file, mp3 files only accepted'));
        }
    },
});
