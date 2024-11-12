import express, { Router, Response, Request, NextFunction } from 'express';
import fs from 'fs/promises';
import { createUserSqlParameters } from '../models/userModels';
import { createUserBodySchema } from '../schemas/userSchemas';
import { imgUploader } from '../middleware/multerUploader';
import { uploadProfilePhoto } from '../middleware/cloudinaryUploader';
import { errorHandler } from '../middleware/errorHandler';
import { hashPassword } from '../middleware/passwordHasher';
import { createUser } from '../middleware/databaseUploader';
const userRouter: Router = express.Router();
/*----Routing----*/
userRouter.post(
  '/create',
  imgUploader.single('profile-photo'),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Valida el cuerpo (metadata)
      const body = createUserBodySchema.parse(req.body);
      //hashear contraseña
      const hashed_password = await hashPassword(body.password);
      // subir photo a cloudinary, si es que existe
      const photo_url = await uploadProfilePhoto(req,body);
      //una vez la contrasena se hashea y se tiene la url de la photo, hacemos el guardado en mysql
      const sqlParameters:createUserSqlParameters = {
        username:body.username,
        name:body.name,
        email:body.email,
        password_hash:hashed_password,
        profile_photo_url:photo_url
      }
      console.log(sqlParameters);//probar
      // Almacenar metadata en BD,
      await createUser(sqlParameters,req,res,next)
    } catch (err: unknown) {
      next(err); // Pasa el error al manejador de errores
    } finally {
      //   Limpia el archivo local
      if (req.file) {
        try {
          await fs.unlink(req.file.path);
          console.log('Local profile photo successfully deleted');
        } catch (err) {
          console.error('Error while deleting the file: ', err);
        }
      }
    }
  }
);

// Middleware global de manejo de errores
userRouter.use(errorHandler);

export default userRouter;
