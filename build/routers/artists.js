"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_middleware_1 = require("../middleware/index.middleware");
const artistController_1 = require("../controllers/artistController");
const artistRouter = express_1.default.Router();
/*----Routing----*/
artistRouter.get('/', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, artistController_1.obtainArtists);
/**
 * @swagger
 * /api/artists:
 *   get:
 *     summary: Obtener todos los artistas.
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Artistas
 *     responses:
 *       200:
 *         description: Datos de Artistas obtenidos.
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
 *                         username:
 *                          type: string
 *                          example: "SonantiaOfficial!"
 *                         name:
 *                          type: string
 *                          example: "Sonantia Corp."
 *                         profile_photo_url:
 *                          type: string
 *                          example: "string"
 *                         interface_color:
 *                          type: string
 *                          example: "#FFFFFF"
 *                         profile_border_color:
 *                          example: "#000000"
 *       400:
 *         description: Error al obtener los artistas.
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
exports.default = artistRouter;
