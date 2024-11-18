import express, { Router, Request, Response, NextFunction } from 'express';
import {verifyAuthorization} from '../middleware/index.middleware';
import { obtainArtists } from '../controllers/artistController';
const artistRouter:Router = express.Router();
/*----Routing----*/
artistRouter.get('/',(req:Request,res:Response,next:NextFunction)=>{verifyAuthorization(req,res,next,'Listener')},obtainArtists);
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
export default artistRouter;