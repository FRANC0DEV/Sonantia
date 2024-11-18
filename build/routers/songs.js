"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_middleware_1 = require("../middleware/index.middleware");
const songController_1 = require("../controllers/songController");
const songRouter = express_1.default.Router();
/*----Routing----*/
songRouter.get('/playlist/:id_playlist', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, songController_1.obtainSongsByPlaylist); //   /playlist/{id_playlist}
/**
 * @swagger
 * /api/songs/playlist/{id_playlist}:
 *   get:
 *     summary: Obtener las canciones de una playlist dado su ID.
 *     parameters:
 *       - in: path
 *         name: id_playlist
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID de la playlist.
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Canciones
 *     responses:
 *       200:
 *         description: Canciones obtenidas.
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
 *                         id_song:
 *                          type: integer
 *                          example: 1
 *                         name:
 *                          type: string
 *                          example: "My song"
 *                         lyrics:
 *                          type: string
 *                          example: "So If your lonely..."
 *                         song_url:
 *                          type: string
 *                          example: "https://song/v=1521616516/song.mp3"
 *                         genre:
 *                          type: string
 *                          example: "Rock"
 *                         song_photo_url:
 *                          type: string
 *                          example: "https://photo/v=1521616516/image/png"
 *                         owners:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: "Admin"
 *       400:
 *         description: Error al obtener las canciones
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
songRouter.get('/album/:id_album', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, songController_1.obtainSongsByAlbum); //   /album/{id_playlist}
/**
 * @swagger
 * /api/songs/album/{id_album}:
 *   get:
 *     summary: Obtener las canciones de un album dado su ID.
 *     parameters:
 *       - in: path
 *         name: id_album
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: ID del album.
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Canciones
 *     responses:
 *       200:
 *         description: Canciones obtenidas.
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
 *                         id_song:
 *                          type: integer
 *                          example: 1
 *                         name:
 *                          type: string
 *                          example: "My song"
 *                         lyrics:
 *                          type: string
 *                          example: "So If your lonely..."
 *                         song_url:
 *                          type: string
 *                          example: "https://song/v=1521616516/song.mp3"
 *                         genre:
 *                          type: string
 *                          example: "Rock"
 *                         song_photo_url:
 *                          type: string
 *                          example: "https://photo/v=1521616516/image/png"
 *                         owners:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: "Admin"
 *       400:
 *         description: Error al obtener las canciones
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
songRouter.get('/genre/:genre_name', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, songController_1.obtainSongsByGenre);
/**
 * @swagger
 * /api/songs/genre/{genre_name}:
 *   get:
 *     summary: Obtener canciones por genero.
 *     parameters:
 *       - in: path
 *         name: genre_name
 *         required: true
 *         schema:
 *           type: string
 *         description: Género musical.
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Canciones
 *     responses:
 *       200:
 *         description: Canciones obtenidas.
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
 *                         id_song:
 *                          type: integer
 *                          example: 1
 *                         name:
 *                          type: string
 *                          example: "My song"
 *                         lyrics:
 *                          type: string
 *                          example: "So If your lonely..."
 *                         song_url:
 *                          type: string
 *                          example: "https://song/v=1521616516/song.mp3"
 *                         genre:
 *                          type: string
 *                          example: "Rock"
 *                         song_photo_url:
 *                          type: string
 *                          example: "https://photo/v=1521616516/image/png"
 *                         owners:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: "Admin"
 *       400:
 *         description: Error al obtener las canciones
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
songRouter.get('/artist/:artist_username', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, songController_1.obtainSongsByArtist);
exports.default = songRouter;
/**
 * @swagger
 * /api/songs/artist/{artist_username}:
 *   get:
 *     summary: Obtener canciones compuestas por un cierto artista.
 *     parameters:
 *       - in: path
 *         name: artist_username
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de usuario del artista.
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Canciones
 *     responses:
 *       200:
 *         description: Canciones obtenidas.
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
 *                         id_song:
 *                          type: integer
 *                          example: 1
 *                         name:
 *                          type: string
 *                          example: "My song"
 *                         lyrics:
 *                          type: string
 *                          example: "So If your lonely..."
 *                         song_url:
 *                          type: string
 *                          example: "https://song/v=1521616516/song.mp3"
 *                         genre:
 *                          type: string
 *                          example: "Rock"
 *                         song_photo_url:
 *                          type: string
 *                          example: "https://photo/v=1521616516/image/png"
 *                         owners:
 *                          type: array
 *                          items:
 *                              type: string
 *                              example: "Admin"
 *       400:
 *         description: Error al obtener las canciones
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
