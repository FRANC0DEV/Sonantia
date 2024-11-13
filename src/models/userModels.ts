export interface UserDB {
    id_user: number;
    username: string;
    name: string;
    email: string;
    roles: string;
    profile_photo_url: string;
    password_hash: string;
    interface_color: string;
    profile_border_color: string;
}

export interface createUserSqlParameters{
    username:string,
    name:string,
    email:string,
    password_hash:string,
    profile_photo_url?:string,
}

export interface seekUserSqlParameters{
    email:string,
    password:string
}