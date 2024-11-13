import { NextFunction, Request, Response } from 'express';
import mySqlConnection from '../connections/mysqlConnection';
import { successLauncher, errorLauncher } from './responseLauncher';
import { createUserSqlParameters, seekUserSqlParameters } from '../interfaces/userModels';
import { UserDB } from '../interfaces/userModels';
import { QueryError } from 'mysql2';
const handleError = (err:unknown, next:NextFunction, _req:Request, res:Response)=>{
    if(err && typeof err === 'object' && 'code' in err && 'errno' in err && 'sqlState' in err && 'message' in err){
        const queryErr = err as QueryError;
        if (queryErr.sqlState!=='45000'){
            errorLauncher(_req,res)
        }
        else{
            const errBody = queryErr.message.split('/').filter((str)=>str!=="").map((e)=>({message:e}))
            errorLauncher(_req,res,errBody,400)
        }
    } else {
        next(err);
    }
};

export const createUser = async (sqlParameters:createUserSqlParameters,_req:Request,res:Response,next:NextFunction)=>{
    try {
        await mySqlConnection.query(
            `call sonantia.CreateUser(?,?,?,?,?)`,
            [sqlParameters.username,sqlParameters.name,sqlParameters.email,sqlParameters.password_hash,sqlParameters.profile_photo_url]
        );
        successLauncher(_req,res,'User successfully created!',200)
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