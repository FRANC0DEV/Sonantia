"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_middleware_1 = require("../middleware/index.middleware");
const genreController_1 = require("../controllers/genreController");
const genreRouter = express_1.default.Router();
/*----Routing----*/
genreRouter.get('/', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, genreController_1.obtainGenres);
exports.default = genreRouter;
/**
 * @swagger
 * /api/genres:
 *   get:
 *     summary: Obtener todos los generos musicales.
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Géneros musicales
 *     responses:
 *       200:
 *         description: Géneros musicales obtenidos.
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                    example: false
 *                  status:
 *                    type: integer
 *                    example: 200
 *                  body:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                         id_genre:
 *                          type: integer
 *                          example: 1
 *                         genre:
 *                          type: string
 *                          example: "J-POP"
 *       400:
 *         description: Error al obtener los géneros musicales
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                    example: true
 *                  status:
 *                    type: integer
 *                    example: 400
 *                  body:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                          example: "User not authenticated, token expired"
 *       500:
 *         description: Error interno en el servidor
 *         content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: boolean
 *                    example: true
 *                  status:
 *                    type: integer
 *                    example: 500
 *                  body:
 *                    type: array
 *                    items:
 *                      type: object
 *                      properties:
 *                        message:
 *                          type: string
 *                          example: "Internal server error"
 */ 
