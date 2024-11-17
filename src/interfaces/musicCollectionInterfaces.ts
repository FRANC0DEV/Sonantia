export interface musicCollectionDB{
    username: string,//the user that is logged
    id_collection: number,
    Type: 'Playlist'|'Album',
    Collection_name: string,
    Collection_description: string,
    Photo_url: string,
    Photo_public_id: string,
    owners:string,
    Relation: 'Created Playlist'|'Created Album'|'Saved Album',
}

export interface playlistReturnInfo{
    id_playlist: number,
    name: string,
    description: string,
    Photo_url: string,
    owners: string[],
}

export interface savedAlbumReturnInfo{
    id_album:number,
    name:string,
    description:string,
    Photo_url:string,
    owners:string[],
}

export interface getCollectionsByUserSqlParameters extends Pick<musicCollectionDB,'username'>{
}