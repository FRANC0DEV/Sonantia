import { NextFunction, Request, Response } from 'express';
import mySqlConnection from '../utils/mysqlConnection';
import { successLauncher } from './responseLauncher';
import { createUserSqlParameters } from '../models/userModels';
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
        if(err && typeof err === 'object' && 'code' in err && 'errno' in err && 'sqlState' in err && 'message' in err){
            const errBody = {
                code:err.code,
                errno:err.errno,
                sqlstate:err.sqlState,
                message:err.message
            };
            next(new Error(
                JSON.stringify(errBody)
            ));
        } else {
            next(err);
        }
    }    
    // mySqlConnection.connect(
    //     (err)=>{
    //         if(err){
    //             const errBody = {
    //                 code:err.code,
    //                 errno:err.errno,
    //                 sqlstate:err.sqlState,
    //                 message:err.message
    //             };
    //             next(new Error(
    //                 JSON.stringify(errBody)
    //             ));
    //             mySqlConnection.end(
    //                 (err:QueryError)=>{
    //                     console.log(`Error while ending the mysql connection: ${err.message}`)
    //                 }
    //             );
    //         }
    //     }
    // );
    // mySqlConnection.query(
    //     `call sonantia.CreateUser(
    //     '${sqlParameters.username}',
    //     '${sqlParameters.name}',
    //     '${sqlParameters.email}',
    //     '${sqlParameters.password_hash}',
    //     '${sqlParameters.profile_photo_url}')`,
    //     (err,_result,_fields)=>{
    //       if(err){
    //         const errorBody = {
    //           sqlstate:err.sqlState,
    //           message:err.message.split(': ')[1],
    //         }
    //         next(new Error(JSON.stringify(errorBody)));
    //       } else{
    //         successLauncher(req, res, /*JSON.stringify(responseBody)*/'registro exitoso!', 200);
    //       }
    //     }
    // )
}