import mySqlConnection from '../connections/mysqlConnection';
import { getCollectionsByUserSqlParameters, musicCollectionDB } from '../interfaces/musicCollectionInterfaces';
import { createUserSqlParameters, seekUserSqlParameters, updateUserSqlParameters } from '../interfaces/userInterfaces';
import { UserDB } from '../interfaces/userInterfaces';
import { songPlaylistDB, songAlbumDB } from '../interfaces/songInterfaces';
export const createUser = async (sqlParameters:createUserSqlParameters)=>{
    return mySqlConnection.query(
        `call sonantia.CreateUser(?,?,?,?,?,?)`,
        [sqlParameters.username,sqlParameters.name,sqlParameters.email,sqlParameters.password_hash,sqlParameters.profile_photo_url,sqlParameters.profile_photo_public_id]
    );
}

export const seekUser = async(sqlParameters:seekUserSqlParameters):Promise<UserDB[]>=>{
    try {
        const [result] = await mySqlConnection.query(
            `select * from sonantia.view_users vu
            where vu.email = ?`,sqlParameters.email
        );
        const users = result as UserDB[];
        return users;//can be empty
    } catch (error) {
        console.log('Error while seeking the user: ', error);
        throw new Error('Something wrong happened, try again later...');
    }
}

export const updateUser = async (sqlParameters:updateUserSqlParameters):Promise<UserDB[]>=>{
    try {
        const [result]= await mySqlConnection.query(
            'call sonantia.UpdateUser(?,?,?,?,?,?)',
            [sqlParameters.username,sqlParameters.new_password_hash,sqlParameters.new_interface_color,sqlParameters.new_profile_border_color,sqlParameters.new_photo_url,sqlParameters.new_photo_public_id]
        );
        if (Array.isArray(result) && result.length > 0) {
            return result[0] as UserDB[];
          } else {
            throw new Error('No data returned from database.');
        }
    } catch (error) {
        console.log('Error while updating user on the database: ', error);
        throw new Error('Something wrong happened, try again later...');
    }
}

export const getPlaylistByUser = async(sqlParameters:getCollectionsByUserSqlParameters)=>{
    try {
        const [result] = await mySqlConnection.query(
            `
            select * from sonantia.view_usersXmusiccollections vumc 
            where vumc.username=? and vumc.Relation=?
            `,
            [sqlParameters.username,'Created Playlist']
        );
        return result as musicCollectionDB[];
    } catch (error) {
        console.log('Error while obtaining user\'s playlists: ', error);
        throw new Error('We couldn\'t obtain user\'s playlists');
    }
}

export const getSavedAlbumsByUser = async(sqlParameters:getCollectionsByUserSqlParameters)=>{
    try {
        const [result] = await mySqlConnection.query(
            `
            select * from sonantia.view_usersXmusiccollections vumc 
            where vumc.username=? and vumc.Relation=?
            `,
            [sqlParameters.username,'Saved Album']
        );
        return result as musicCollectionDB[];
    } catch (error) {
        console.log('Error while obtaining user\'s saved albums: ', error);
        throw new Error('We couldn\'t obtain user\'s saved albums');
    }
}

export const getSongsByPlaylist = async (playlist_id:number)=>{
    try {
        const [result] = await mySqlConnection.query(
            `
            select * from sonantia.view_songsXplaylist vsp
            where vsp.id_playlist=?
            `,
            [playlist_id]
        );
        return result as songPlaylistDB[];
    } catch (error) {
        console.log('Error while obtaining the songs: ', error);
        throw new Error('We couldn\'t obtain the songs')        
    }
}

export const getSongsByAlbum = async (album_id:number)=>{
    try {
        const [result] = await mySqlConnection.query(
            `
            select * from sonantia.view_songsXalbums vsa where vsa.id_album=?
            `,
            [album_id]
        );
        return result as songAlbumDB[];
    } catch (error) {
        console.log('Error while obtaining the songs: ', error);
        throw new Error('We couldn\'t obtain the songs')  
    }
}