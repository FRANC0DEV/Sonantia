import express,{ Request, Response, NextFunction, Router } from 'express';
import {verifyAuthorization} from '../middleware/index.middleware'
import { getUserPlaylists, getUserSavedAlbums } from '../controllers/listenerController';
const listenerRouter:Router = express.Router();

listenerRouter.get(
    '/my-playlists',
    (req:Request,res:Response,next:NextFunction)=>{verifyAuthorization(req,res,next,'Listener');},
    getUserPlaylists
);
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
listenerRouter.get(
    '/saved-albums',
    (req:Request,res:Response,next:NextFunction)=>{verifyAuthorization(req,res,next,'Listener');},
    getUserSavedAlbums
);
export default listenerRouter;
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