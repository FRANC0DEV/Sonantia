import { Request, Response, NextFunction } from "express";
import { userPayload } from '../interfaces/userInterfaces';
import { getCollectionsByUserSqlParameters,playlistReturnInfo, savedAlbumReturnInfo } from '../interfaces/musicCollectionInterfaces';
import { getPlaylistByUser,getSavedAlbumsByUser } from '../utils/databaseManager';
import { successLauncher } from "../utils/responseLauncher";

export const getUserPlaylists = async (req:Request, res:Response, next:NextFunction)=>{
    try {
        const userPayload:userPayload = req.user;
        const sqlParameters:getCollectionsByUserSqlParameters = {
            username:userPayload.username
        }
        const playlists = await getPlaylistByUser(sqlParameters);
        if (playlists.length===0){
            return successLauncher(req, res, [], 200);
        }
        const returnInfo:playlistReturnInfo[]=playlists.map(
            (collection)=>{
                const playlist:playlistReturnInfo = {
                    id_playlist:collection.id_collection,
                    name:collection.Collection_name,
                    description:collection.Collection_description,
                    Photo_url:collection.Photo_url,
                    owners:collection.owners.split(' ')
                }
                return playlist;
            }
        );
        successLauncher(req,res,returnInfo,200);
    } catch (error) {
        next(error);
    }
}

export const getUserSavedAlbums = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const userPayload:userPayload = req.user;
        const sqlParameters:getCollectionsByUserSqlParameters = {
            username:userPayload.username
        }
        const savedAlbums = await getSavedAlbumsByUser(sqlParameters);
        if (savedAlbums.length===0){
            return successLauncher(req, res, [], 200);
        }
        const returnInfo:savedAlbumReturnInfo[]=savedAlbums.map(
            (collection)=>{
                const savedAlbum:savedAlbumReturnInfo = {
                    id_album:collection.id_collection,
                    name:collection.Collection_name,
                    description:collection.Collection_description,
                    Photo_url:collection.Photo_url,
                    owners: collection.owners.split(' ')
                }
                return savedAlbum;
            }
        );
        successLauncher(req,res,returnInfo,200);
    } catch (error) {
        next(error);
    }
}