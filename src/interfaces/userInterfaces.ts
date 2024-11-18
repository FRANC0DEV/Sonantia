export interface UserDB {
    id_user: number;
    username: string;
    name: string;
    email: string;
    roles: string;
    profile_photo_url: string;
    profile_photo_public_id:string;
    password_hash: string;
    interface_color: string;
    profile_border_color: string;
}

export interface createUserSqlParameters extends Pick<UserDB,'username'|'name'|'email'|'password_hash'|'profile_photo_url'|'profile_photo_public_id'>{
}

export interface seekUserSqlParameters extends Pick<UserDB,'email'>{
    password:string
}

export interface updateUserSqlParameters extends Pick<UserDB,'username'>{
    new_password_hash:string,
    new_profile_border_color:string,
    new_interface_color:string,
    new_photo_url:string,
    new_photo_public_id:string,
}
interface userPreferences extends Pick<UserDB,'interface_color'|'profile_border_color'>{
}

interface userProfilePhoto extends Pick<UserDB, 'profile_photo_url'|'profile_photo_public_id'>{

}

export interface userTokenInfo extends Pick<UserDB,'username'|'name'|'email'>{
    roles:string[],
    profile_photo:userProfilePhoto,
    preferences:userPreferences,
}

export interface thirdUserInfo extends Omit<UserDB,'id_user'|'email'|'roles'|'profile_photo_public_id'|'password_hash'>{}

export interface userPayload extends userTokenInfo{
    iat:number,
    exp:number
}