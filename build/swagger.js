"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const path_1 = __importDefault(require("path"));
const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Sonantia Music API Documentation',
            version: '1.0.0',
        }
    },
    apis: [`${path_1.default.join(__dirname, './routers/*')}`] //le quite el ts.
};
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
// console.log(swaggerSpec);
exports.default = swaggerSpec;
