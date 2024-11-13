import express from 'express';
import { Express } from 'express';
import { appConfig } from './config';
import {userRouter,musicRouter,artistRouter} from './routers/index'
import { successLauncher, errorLauncher } from './middleware/responseLauncher';
const app:Express = express();
app.set('port', appConfig.port);
/*Basic routing*/
app.get('/',(_req, res)=>{
    successLauncher(_req,res,'Bienvenido a Express.ts!',200)
})
app.use(express.json())
/*Routers usage (endpoints)*/
app.use('/api/users', userRouter);
app.use('/api/artist',artistRouter);
app.use('/api/music',musicRouter);
/*General error launcher in case client requests from an endpoint that doesn't exist*/
app.use((_req, res)=>{
    errorLauncher(_req,res,'El contenido que está buscando no existe',400)
})
export default app;