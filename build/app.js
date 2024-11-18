"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const config_1 = require("./config");
const index_routers_1 = require("./routers/index.routers");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
const index_utils_1 = require("./utils/index.utils");
const app = (0, express_1.default)();
app.set('port', config_1.appConfig.port);
/*Basic routing*/
app.get('/', (_req, res) => {
    (0, index_utils_1.successLauncher)(_req, res, 'Bienvenido a Express.ts!', 200);
});
app.use(express_1.default.json());
/*Routers usage (endpoints)*/
app.use('/api/docs', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
app.use('/api/users', index_routers_1.userRouter);
app.use('/api/listeners', index_routers_1.listenerRouter);
app.use('/api/artists', index_routers_1.artistRouter);
app.use('/api/genres', index_routers_1.genreRouter);
app.use('/api/songs', index_routers_1.songRouter);
/*error handler in case something haves in each router*/
app.use(index_utils_1.errorHandler);
/*General error launcher in case client requests from an endpoint that doesn't exist*/
app.use((_req, res) => {
    (0, index_utils_1.errorLauncher)(_req, res, [{ message: 'El contenido que está buscando no existe' }], 404);
});
exports.default = app;
