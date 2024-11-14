import mySqlConnection from '../connections/mysqlConnection';
import { createUserSqlParameters, seekUserSqlParameters } from '../interfaces/userInterfaces';
import { UserDB } from '../interfaces/userInterfaces';
export const createUser = async (sqlParameters:createUserSqlParameters)=>{
    await mySqlConnection.query(
        `call sonantia.CreateUser(?,?,?,?,?,?)`,
        [sqlParameters.username,sqlParameters.name,sqlParameters.email,sqlParameters.password_hash,sqlParameters.profile_photo_url,sqlParameters.profile_photo_public_id]
    );
}

export const seekUser = async(sqlParameters:seekUserSqlParameters):Promise<UserDB[]>=>{
    const [result] = await mySqlConnection.query(
        `select * from sonantia.view_users vu
        where vu.email = ?`,sqlParameters.email
    );
    const users = result as UserDB[];
    return users;
}