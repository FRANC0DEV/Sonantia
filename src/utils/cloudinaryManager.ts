import cloudinary from '../connections/cloudinaryConfig';
import { createUserBodySchema,} from '../schemas/userSchemas';
import { Request } from 'express';
import { z } from 'zod';
import { cloudImgData } from '../interfaces/cloudResInterfaces';
import { userPayload } from '../interfaces/userInterfaces';
export const uploadProfilePhoto = async(req:Request,body:z.infer<typeof createUserBodySchema>):Promise<cloudImgData>=>{
    if(req.file){
        try {
            const cloudRes = await cloudinary.uploader.upload(
                req.file.path,
                {
                  folder:'/sonantia/users/Profile_Photos',
                  resource_type:'image',
                  public_id:`${body.username}-Profile_Photo`,
                  upload_preset:'sonantia_profile_photo',
                }
            );
            return {photo_url:cloudRes.secure_url, photo_public_id:cloudRes.public_id};
        } catch (error) {
            console.log('Error while uploading the photo to cloudinary: ', error);
            throw new Error('Something wrong happened, try again later...');
        }
    }
    return {photo_url:'', photo_public_id:''};
}

export const deleteProfilePhoto = async(photo_public_id:string)=>{
    return cloudinary.uploader.destroy(
        photo_public_id,
        {
            resource_type:'image',
        }
    );
}

export const updateProfilePhoto = async (req:Request):Promise<cloudImgData>=>{
    try {
        if (req.file) {
            const userPayload = req.user as userPayload;
            const cloudRes=await cloudinary.uploader.upload(
                req.file.path,
                {
                    folder:'/sonantia/users/Profile_Photos',
                    resource_type:'image',
                    public_id:`${userPayload.username}-Profile_Photo`,/*we cannot put the entire public id saved on the database cause this is not the publicID that will be show in cloud, the folder path will be added by default befor this string. If we do, we will not reference the photo correctly, since we are saying that the id is <path>/<path>/<this string>*/
                    upload_preset:'sonantia_profile_photo',
                }
            )
            return {photo_url:cloudRes.secure_url, photo_public_id:cloudRes.public_id};
            /*important to return the url since this one contains the link of the asset but in its lastest version */
        }
        return {photo_url:'',photo_public_id:''}
    } catch (error) {
        console.log('Error while updating the profile photo on cloudinary: ',error);
        throw new Error('Something happened while updating the profile photo, try again later...');   
    }
}