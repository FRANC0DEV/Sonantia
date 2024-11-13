import express, { Router } from 'express';
import { imgUploader } from '../utils/index.utils';
import { createNewUser, login } from '../controllers/userController';
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
 *               name:
 *                 type: string
 *                 description: nombre del usuario
 *               email:
 *                 type: string
 *                 format: email
 *                 description: correo electronico del nuevo usuario
 *               password:
 *                 type: string
 *                 description: contraseña del nuevo usuario
 *               profile-photo:
 *                 type: file
 *                 description: Foto de perfil (opcional)
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
export default userRouter;