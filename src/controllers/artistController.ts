import { Request, Response, NextFunction } from 'express';
import { getArtists, successLauncher } from '../utils/index.utils';
import { thirdUserInfo } from '../interfaces/userInterfaces';
export const obtainArtists = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const artists = await getArtists();
        const returnInfo:thirdUserInfo[] = artists.map(
            (artist)=>{
                const artistInfo:thirdUserInfo = {
                    username:artist.username,
                    name:artist.name,
                    profile_photo_url:artist.profile_photo_url,
                    interface_color:artist.interface_color,
                    profile_border_color:artist.profile_border_color
                };
                return artistInfo;
            }
        );
        successLauncher(req,res,returnInfo,200);
    } catch (error) {
        next(error);
    }
}