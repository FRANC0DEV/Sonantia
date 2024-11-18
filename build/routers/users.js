"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_utils_1 = require("../utils/index.utils");
const userController_1 = require("../controllers/userController");
const index_middleware_1 = require("../middleware/index.middleware");
const userRouter = express_1.default.Router();
/*----Routing----*/
/*create endpoint*/
userRouter.post('/create', userController_1.createNewUser);
/**
 * @swagger
 * /api/users/create:
 *   post:
 *     summary: Crear una nueva cuenta
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 required: true
 *               name:
 *                 type: string
 *                 required: true
 *               email:
 *                 type: string
 *                 format: email
 *                 required: true
 *               password:
 *                 type: string
 *                 required: true
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
 *                          example: "Correo ya en uso"
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
userRouter.post('/auth', userController_1.login);
/**
 * @swagger
 * /api/users/auth:
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
userRouter.post('/auth/renovate', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, index_middleware_1.renovateToken);
/**
 * @swagger
 * /api/users/auth/renovate:
 *   post:
 *     summary: Renovar token de acceso
 *     security:
 *          - bearerAuth: []
 *     tags:
 *       - Usuarios
 *     responses:
 *       200:
 *         description: Token de acceso renovado.
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
 *                      newAccessToken:
 *                          type: string
 *                          example: "sdncahsisndfvknbfxd"
 *       400:
 *         description: Error al refrescar el token de acceso
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
/*update profile endpoint*/
userRouter.put('/update', (req, res, next) => { (0, index_middleware_1.verifyAuthorization)(req, res, next, 'Listener'); }, index_utils_1.imgUploader.single('profile-photo'), userController_1.updateProfile);
exports.default = userRouter;
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
 *               interface_color:
 *                 type: string
 *                 description: Color de la interfaz en formato hexadecimal
 *               profile_border_color:
 *                 type: string
 *                 description: Color de borde de perfil en formato hexadecimal
 *               password:
 *                 type: string
 *                 description: nueva contraseña del usuario (opcional)
 *                 required: true
 *               profile-photo:
 *                 type: file
 *                 description: nueva foto de perfil
 *                 required: false
 *     responses:
 *       200:
 *         description: Datos actualizados con éxito
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
 *                      message:
 *                          type: string
 *                          example: "Datos actualizados correctamente"
 *                      body:
 *                          type: object
 *                          properties:
 *                             newAccessToken:
 *                                type: string
 *                                example: "sdncahsisndfvknbfxd"
 *                             newRefreshToken:
 *                                type: string
 *                                example: "aaijhsygsdvhbdjvhbh"
 *       400:
 *         description: Error al actualizar los datos
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
 *                          example: "El color de interfaz no está en formato hexadecimal"
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
 *
 *
 */ 
