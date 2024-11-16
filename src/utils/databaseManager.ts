import mySqlConnection from '../connections/mysqlConnection';
import { createUserSqlParameters, seekUserSqlParameters, updateUserSqlParameters } from '../interfaces/userInterfaces';
import { UserDB } from '../interfaces/userInterfaces';
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