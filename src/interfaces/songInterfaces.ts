export interface songDB{
    id_song:number,
    name:string,
    lyrics:string,
    song_url:string,
    song_public_id:string,
    genre:string,
    song_photo_url:string,
    song_photo_public_id:string,
    song_type:'Album Song'|'Single',
    owners: string
}

export interface songPlaylistDB extends songDB{
    id_playlist:number,
}

export interface songAlbumDB extends songDB{
    id_album:number,
}

export interface songReturnInfo extends Omit<songDB,'song_public_id'|'song_photo_public_id'|'song_type'|'owners'>{
    owners:string[]
}

export interface genreDB{
    id_genre:number,
    genre:string,
}