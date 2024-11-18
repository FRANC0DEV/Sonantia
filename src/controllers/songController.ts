import { Request, Response, NextFunction } from "express";
import { getSongsByPlaylist, getSongsByAlbum, successLauncher,getSongsByGenre,getSongsByArtist} from '../utils/index.utils';
import { songReturnInfo } from "../interfaces/songInterfaces";
export const obtainSongsByPlaylist = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const playlist_id = parseInt(req.params.id_playlist);
        const songs = await getSongsByPlaylist(playlist_id);
        if (songs.length===0){
            return successLauncher(req, res, [], 200);
        }
        const returnInfo:songReturnInfo[] = songs.map(
            (song)=>{
                const songInfo:songReturnInfo = {
                    id_song:song.id_song,
                    name:song.name,
                    lyrics:song.lyrics,
                    song_photo_url:song.song_photo_url,
                    song_url:song.song_url,
                    genre:song.genre,
                    owners: song.owners.split(' ')
                }
                return songInfo;
            }
        );
        successLauncher(req,res,returnInfo,200);
    } catch (error) {
        next(error);
    }
}

export const obtainSongsByAlbum = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const album_id=parseInt(req.params.id_album);
        const songs = await getSongsByAlbum(album_id);
        if (songs.length===0){
            return successLauncher(req, res, [], 200);
        }
        const returnInfo:songReturnInfo[] = songs.map(
            (song)=>{
                const songInfo:songReturnInfo = {
                    id_song:song.id_song,
                    name:song.name,
                    lyrics:song.lyrics,
                    song_photo_url:song.song_photo_url,
                    song_url:song.song_url,
                    genre:song.genre,
                    owners: song.owners.split(' ')
                }
                return songInfo;
            }
        );
        successLauncher(req,res,returnInfo,200);
    } catch (error) {
        next(error)
    }
}

export const obtainSongsByGenre = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const genre= req.params.genre_name.toString();
        const songs = await getSongsByGenre(genre);
        if (songs.length===0){
            return successLauncher(req, res, [], 200);
        }
        const returnInfo:songReturnInfo[] = songs.map(
            (song)=>{
                const songInfo:songReturnInfo = {
                    id_song:song.id_song,
                    name:song.name,
                    lyrics:song.lyrics,
                    song_photo_url:song.song_photo_url,
                    song_url:song.song_url,
                    genre:song.genre,
                    owners: song.owners.split(' ')
                }
                return songInfo;
            }
        );
        successLauncher(req,res,returnInfo,200);
    } catch (error) {
        next(error)
    }
}

export const obtainSongsByArtist = async(req:Request, res:Response, next:NextFunction)=>{
    try {
        const username= req.params.artist_username.toString();
        const songs = await getSongsByArtist(username);
        if (songs.length===0){
            return successLauncher(req, res, [], 200);
        }
        const returnInfo:songReturnInfo[] = songs.map(
            (song)=>{
                const songInfo:songReturnInfo = {
                    id_song:song.id_song,
                    name:song.name,
                    lyrics:song.lyrics,
                    song_photo_url:song.song_photo_url,
                    song_url:song.song_url,
                    genre:song.genre,
                    owners: song.owners.split(' ')
                }
                return songInfo;
            }
        );
        successLauncher(req,res,returnInfo,200);
    } catch (error) {
        next(error)
    }
}