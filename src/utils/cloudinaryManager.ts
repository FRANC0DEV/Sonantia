import cloudinary from '../connections/cloudinaryConfig';
import { createUserBodySchema } from '../schemas/userSchemas';
import { Request } from 'express';
import { z } from 'zod';
import { cloudImgData } from '../interfaces/cloudResInterfaces';
export const uploadProfilePhoto = async(req:Request,body:z.infer<typeof createUserBodySchema>):Promise<cloudImgData>=>{
    if(req.file){
        const cloudRes = await cloudinary.uploader.upload(
            req.file.path,
            {
              folder:'/sonantia/users/Profile_Photos',
              resource_type:'image',
              public_id:`${req.file.filename}-${body.username}-Profile_Photo`,
              upload_preset:'sonantia_profile_photo',
            }
        )
        return {photo_url:cloudRes.secure_url, photo_public_id:cloudRes.public_id};
    }
    return {photo_url:'', photo_public_id:''};
}

export const deleteProfilePhoto = async(imgData:cloudImgData)=>{
    try {
        await cloudinary.uploader.destroy(
            imgData.photo_public_id,
            {
                resource_type:'image',
            }
        )
        console.log('Photo successfully deleted from cloudinary');
        
    } catch (error) {
        console.log('Error while deleting the photo from cloud: ', error);
    }
}