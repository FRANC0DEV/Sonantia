export interface createUserSqlParameters{
    username:string,
    name:string,
    email:string,
    password_hash:string,
    profile_photo_url?:string,
}