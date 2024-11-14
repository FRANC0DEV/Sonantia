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

export interface createUserSqlParameters extends Pick<UserDB,'username'|'name'|'email'|'password_hash'|'profile_photo_url'>{
}

export interface seekUserSqlParameters extends Pick<UserDB,'email'>{
    password:string
}

interface userPreferences extends Pick<UserDB,'interface_color'|'profile_border_color'>{
}

export interface userTokenInfo extends Pick<UserDB,'username'|'name'|'email'|'profile_photo_url'>{
    roles:string[],
    preferences:userPreferences
}