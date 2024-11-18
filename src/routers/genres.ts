import express, { Router, Request, Response, NextFunction } from 'express';
import {verifyAuthorization} from '../middleware/index.middleware';
import { obtainGenres } from '../controllers/genreController';
const genreRouter:Router = express.Router();
/*----Routing----*/
genreRouter.get('/',(req:Request,res:Response,next:NextFunction)=>{verifyAuthorization(req,res,next,'Listener')},obtainGenres);
export default genreRouter;
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