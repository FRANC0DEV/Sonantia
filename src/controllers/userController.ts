import { Response, Request, NextFunction } from 'express';
import fs from 'fs/promises';
import { createUserSqlParameters, seekUserSqlParameters, userTokenInfo } from '../interfaces/userInterfaces';
import { createUserBodySchema, loginUserBodySchema } from '../schemas/userSchemas';
import {hashPassword,uploadProfilePhoto,createUser,seekUser,comparePassword,generateAccessToken,generateRefreshToken, successLauncher, deleteProfilePhoto} from '../utils/index.utils'
import { cloudImgData } from '../interfaces/cloudResInterfaces';
export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
  let imgInCloud = false;
  let cloudResponse:cloudImgData = {photo_url:'',photo_public_id:''};
  try {
    // Valida el cuerpo (metadata)
    const body = createUserBodySchema.parse(req.body);
    //hashear contraseña
    const hashed_password = await hashPassword(body.password);
    // subir photo a cloudinary, si es que existe
    cloudResponse = await uploadProfilePhoto(req,body);
    imgInCloud = true;
    //una vez la contrasena se hashea y se tiene la url de la photo, hacemos el guardado en mysql
    const sqlParameters:createUserSqlParameters = {
      username:body.username,
      name:body.name,
      email:body.email,
      password_hash:hashed_password,
      profile_photo_url:cloudResponse.photo_url,
      profile_photo_public_id:cloudResponse.photo_public_id
    };
    // Almacenar metadata en BD,
    await createUser(sqlParameters,/*req,res/*,next*/);
    successLauncher(req,res,'User successfully created!',200);
  } catch (err: unknown) {
    //deleting photo from cloudinary in case it was already uploaded
    if (imgInCloud){
      await deleteProfilePhoto(cloudResponse);
      imgInCloud = false;
    }
    next(err); // Passing error to the handler
  } finally {
    //   Erasing local file
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

export const login = async (req:Request, res:Response, next:NextFunction)=>{
    try {
      //validate the body
      const body = loginUserBodySchema.parse(req.body);
      const parameters = body as seekUserSqlParameters;
      //then we must see if the user exists or not
      const result = await seekUser(parameters/*, req,res/*,next*/);
      if(result.length===0){
        throw new Error('Email or password incorrect, try again.')
      }
      const user = result[0];
      //after that, we must check if the password is correct
      const match = await comparePassword(body.password,user.password_hash);
      if(!match){
        throw new Error('Email or password incorrect, try again.')
      }
      //from here, email and password are correct
      const userTokenInfo:userTokenInfo ={
        username:user.username,
        name:user.name,
        email:user.email,
        profile_photo:{profile_photo_url:user.profile_photo_url,profile_photo_public_id:user.profile_photo_public_id},
        preferences:{interface_color:user.interface_color,profile_border_color:user.profile_border_color},
        roles: user.roles.split(', ')
      }
      const accesstoken = generateAccessToken(userTokenInfo);
      const refreshtoken = generateRefreshToken(userTokenInfo);
      successLauncher(req,res,{accesstoken,refreshtoken},200)
    } catch (err) {
      next(err);
    }
}

export const updateProfile = async (_req:Request, _res:Response, _next:NextFunction)=>{

}