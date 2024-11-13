import { NextFunction, Request, Response } from 'express';
import mySqlConnection from '../utils/mysqlConnection';
import { successLauncher, errorLauncher } from './responseLauncher';
import { createUserSqlParameters, seekUserSqlParameters } from '../models/userModels';
// import { QueryResult } from 'mysql2';
import { UserDB } from '../models/userModels';
const handleError = (err:unknown, next:NextFunction, _req:Request, res:Response)=>{
    if(err && typeof err === 'object' && 'code' in err && 'errno' in err && 'sqlState' in err && 'message' in err){
        const errBody = {
            code:err.code,
            errno:err.errno,
            sqlstate:err.sqlState,
            message:err.message
        };
        errorLauncher(_req,res,JSON.stringify(errBody),500)
    } else {
        next(err);
    }
};

export const createUser = async (sqlParameters:createUserSqlParameters,_req:Request,res:Response,next:NextFunction)=>{
    try {
        await mySqlConnection.query(
            `call sonantia.CreateUser(
            '${sqlParameters.username}',
            '${sqlParameters.name}',
            '${sqlParameters.email}',
            '${sqlParameters.password_hash}',
            '${sqlParameters.profile_photo_url}')`
        );
        successLauncher(_req,res,'Usuario Creado!',200)
    } catch (err) {
        handleError(err,next,_req,res,)
    }    
}

export const seekUser = async(sqlParameters:seekUserSqlParameters,_req:Request,res:Response,next:NextFunction):Promise<UserDB[]>=>{
    try {
        const [result] = await mySqlConnection.query(
            `select * from sonantia.view_users vu
            where vu.email = ?`,sqlParameters.email
        );
        const users = result as UserDB[];
        // console.log(users);
        return users;
    } catch (err) {
        handleError(err,next,_req,res);
    }
    return [];
}