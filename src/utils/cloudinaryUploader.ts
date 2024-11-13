import cloudinary from '../connections/cloudinaryConfig';
import { createUserBodySchema } from '../schemas/userSchemas';
import { Request } from 'express';
import { z } from 'zod';
export const uploadProfilePhoto = async(req:Request,body:z.infer<typeof createUserBodySchema>):Promise<string>=>{
    if(req.file){
        const cloudRes = await cloudinary.uploader.upload(
            req.file.path,
            {
              folder:'/sonantia/users/Profile_Photos',
              resource_type:'image',
              public_id:`${body.username}`,
              upload_preset:'sonantia_profile_photo',
            }
        )
        return cloudRes.secure_url;
    }
    return '';
}