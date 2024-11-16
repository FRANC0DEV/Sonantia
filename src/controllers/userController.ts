import { Response, Request, NextFunction } from 'express';
import fs from 'fs/promises';
import { createUserSqlParameters, seekUserSqlParameters,updateUserSqlParameters, userTokenInfo,userPayload, UserDB, /*UserDB*/ } from '../interfaces/userInterfaces';
import { createUserBodySchema, loginUserBodySchema, updateUserBodySchema } from '../schemas/userSchemas';
import {hashPassword,uploadProfilePhoto,createUser,seekUser,updateUser,comparePassword,generateAccessToken,generateRefreshToken, successLauncher, deleteProfilePhoto,updateProfilePhoto} from '../utils/index.utils'
import { cloudImgData } from '../interfaces/cloudResInterfaces';
// import { QueryResult } from 'mysql2';
export const createNewUser = async (req: Request, res: Response, next: NextFunction) => {
  let imgInCloud = false;
  let cloudResponse:cloudImgData = {photo_url:'',photo_public_id:''};
  try {
    // Valida el cuerpo (metadata)
    const body = createUserBodySchema.parse(req.body);
    //parallel promise execution
    const responses = await Promise.all([
      hashPassword(body.password),//password hashing
      uploadProfilePhoto(req, body)//photo uploading on cloud
    ]);
    cloudResponse=responses[1];
    if(cloudResponse.photo_public_id!=='') {
      imgInCloud = true;
    }
    //once both promises are completed, we can execute the code below
    const sqlParameters:createUserSqlParameters = {
      username:body.username,
      name:body.name,
      email:body.email,
      password_hash:responses[0],
      profile_photo_url:cloudResponse.photo_url,
      profile_photo_public_id:cloudResponse.photo_public_id
    };
    // Storing metadata in the database,
    await createUser(sqlParameters);
    successLauncher(req,res,'User successfully created!',200);
  } catch (err: unknown) {
    //deleting photo from cloudinary in case it was already uploaded, this is executed while we give the err response
    if (imgInCloud){
      deleteProfilePhoto(cloudResponse.photo_public_id)
      .then(()=>{console.log('Photo successfully deleted from cloudinary');})
      .catch(
        (error)=>{console.log('Error while trying to delete the profile photo from cloudinary: ', error);}
      );
    }
    next(err); // Passing principal error to the handler
  } finally {
    //   Erasing local file
    if (req.file) {
      fs.unlink(req.file.path)
      .then(()=>{console.log('Local profile photo successfully deleted');})
      .catch((err)=>{console.log('Error while deleting the file: ', err)})
    }
  }
}

export const login = async (req:Request, res:Response, next:NextFunction)=>{
  try {
    //validate the body
    const body = loginUserBodySchema.parse(req.body);
    const parameters = body as seekUserSqlParameters;
    //then we must see if the user exists or not
    const result = await seekUser(parameters);
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

export const updateProfile = async (req:Request, res:Response, next:NextFunction)=>{
  try {
    //parse the body
    const body = updateUserBodySchema.parse(req.body);
    const userPayload = req.user as userPayload;
    const new_password_hash = body.password?await hashPassword(body.password):'';
    const profile_border_color = body.profile_border_color||'';
    const interface_color = body.interface_color||'';
    //update cloudinary photo
    const cloudResponse = await updateProfilePhoto(req/*,userPayload*/);
    const sqlParameters:updateUserSqlParameters={
      username:userPayload.username,
      new_password_hash:new_password_hash,
      new_profile_border_color:profile_border_color,
      new_interface_color:interface_color,
      new_photo_url:cloudResponse.photo_url,
      new_photo_public_id:cloudResponse.photo_public_id
    }
    const result:UserDB[]= await updateUser(sqlParameters);
    const userData = result[0];
    // console.log(userData);
    // console.log(userData.roles.split(', '))
    const newUserTokenInfo:userTokenInfo ={
      username:userData.username,
      name:userData.name,
      email:userData.email,
      profile_photo: {profile_photo_url:userData.profile_photo_url, profile_photo_public_id:userData.profile_photo_public_id},
      preferences: {profile_border_color:userData.profile_border_color, interface_color:userData.interface_color},
      roles: userData.roles.split(', ')
    } 
    const newAccessToken = generateAccessToken(newUserTokenInfo);
    const newRefreshToken = generateRefreshToken(newUserTokenInfo);
    const message = {
      message:'User data updated successfully',
      newAccessToken: newAccessToken,
      newRefreshToken: newRefreshToken
    }
    successLauncher(req,res,message /*result*/,200);
  } catch (error) {
    next(error);
  }
}