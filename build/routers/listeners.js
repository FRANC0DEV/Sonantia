"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_middleware_1 = require("../middleware/index.middleware");
const listenerController_1 = require("../controllers/listenerController");
const listenerRouter = express_1.default.Router();
listenerRouter.get('/my-playlists', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, listenerController_1.getUserPlaylists);
/**
 * @swagger
 * /api/listeners/my-playlists:
 *   get:
 *     summary: Playlists del Usuario
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Oyentes
 *     responses:
 *       200:
 *         description: Playlists obtenidas
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
 *                         id_playlist:
 *                          type: integer
 *                          example: 1
 *                         name:
 *                          type: string
 *                          example: "My playlist"
 *                         description:
 *                          type: string
 *                          example: "A special playlist made when I was 10."
 *                         Photo_url:
 *                          type: string
 *                          example: "https://photo/v=1521616516/image.png"
 *                         owners:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: "Admin"
 *       400:
 *         description: Error al obtener las playlists
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
/*get saved albums endpoint*/
listenerRouter.get('/saved-albums', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, listenerController_1.getUserSavedAlbums);
exports.default = listenerRouter;
/**
 * @swagger
 * /api/listeners/saved-albums:
 *   get:
 *     summary: Albums guardados por el usuario
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Oyentes
 *     responses:
 *       200:
 *         description: Albums obtenidos
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
 *                         id_album:
 *                          type: integer
 *                          example: 1
 *                         name:
 *                          type: string
 *                          example: "Let my think"
 *                         description:
 *                          type: string
 *                          example: "3rd album of Mike Kllahan"
 *                         Photo_url:
 *                          type: string
 *                          example: "https://photo/v=1521616516/image.png"
 *                         owners:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: "Mike Kllahan"
 *       400:
 *         description: Error al obtener los albums
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
