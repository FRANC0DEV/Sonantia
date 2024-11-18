import express, { Express } from 'express';
import { appConfig } from './config';
import {userRouter,songRouter,artistRouter,listenerRouter,genreRouter} from './routers/index.routers'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './swagger';
import { successLauncher, errorLauncher, errorHandler } from './utils/index.utils';
const app:Express = express();
app.set('port', appConfig.port);
/*Basic routing*/
app.get('/',(_req, res)=>{
    successLauncher(_req,res,'Bienvenido a Express.ts!',200)
})
app.use(express.json())
/*Routers usage (endpoints)*/
app.use('/api/docs', swaggerUi.serve,swaggerUi.setup(swaggerSpec))
app.use('/api/users', userRouter);
app.use('/api/listeners',listenerRouter);
app.use('/api/artists',artistRouter);
app.use('/api/genres',genreRouter)
app.use('/api/songs',songRouter);
/*error handler in case something haves in each router*/
app.use(errorHandler);
/*General error launcher in case client requests from an endpoint that doesn't exist*/
app.use((_req, res)=>{
    errorLauncher(_req,res,[{message:'El contenido que está buscando no existe'}],404)
})
export default app;