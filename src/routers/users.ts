import express, { Request, Router } from 'express';
import { imgUploader } from '../utils/index.utils';
import { createNewUser, login } from '../controllers/userController';
import { verifyAuthorization } from '../middleware/index.middleware';
const userRouter: Router = express.Router();
/*----Routing----*/
/*create endpoint*/
userRouter.post('/create', imgUploader.single('profile-photo'), createNewUser);
/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Crear una nueva cuenta
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: nombre de usuario
 *                 required: true
 *               name:
 *                 type: string
 *                 description: nombre del usuario
 *                 required: true
 *               email:
 *                 type: string
 *                 format: email
 *                 description: correo electronico del nuevo usuario
 *                 required: true
 *               password:
 *                 type: string
 *                 description: contraseña del nuevo usuario
 *                 required: true
 *               profile-photo:
 *                 type: file
 *                 description: Foto de perfil (opcional)
 *                 required: false
 *     responses:
 *       200:
 *         description: Cuenta creada con éxito
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
 *                    type: string
 *                    example: "Cuenta creada con éxito"
 *       400:
 *         description: Error de validación
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
 *                          example: "Email already used"
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

/*Login endpoint*/
userRouter.post('/login', login);
/**
 * @swagger
 * /api/users/login:
 *   post:
 *     summary: Iniciar sesión
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: correo electronico del usuario
 *               password:
 *                 type: string
 *                 description: contraseña del usuario
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
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
 *                    type: object
 *                    properties:
 *                      accesstoken:
 *                          type: string
 *                          example: "sdncahsisndfvknbfxd"
 *                      refreshtoken:
 *                          type: string
 *                          example: "aaijhsygsdvhbdjvhbh"
 *       400:
 *         description: Error de inicio de sesión
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
 *                          example: "Email or password incorrect."
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

/*update profile endpoint*/
userRouter.put('/update',(req:Request,res,next)=>{verifyAuthorization(req,res,next,'Listener');}, imgUploader.single('profile-photo'),)
/**
 * @swagger
 * /api/users/update:
 *   put:
 *     summary: Actualizar los datos del usuario
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: nuevo nombre de usuario
 *                 required: true
 *               password:
 *                 type: string
 *                 description: nueva contraseña del usuario
 *                 required: true
 *               profile-photo:
 *                 type: file
 *                 description: nueva photo de perfil
 *                 required: false
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
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
 *                    type: object
 *                    properties:
 *                      accesstoken:
 *                          type: string
 *                          example: "sdncahsisndfvknbfxd"
 *                      refreshtoken:
 *                          type: string
 *                          example: "aaijhsygsdvhbdjvhbh"
 *       400:
 *         description: Error de inicio de sesión
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
 *                          example: "Email or password incorrect."
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
export default userRouter;