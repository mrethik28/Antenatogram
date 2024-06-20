import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import type { Express } from 'express';
import { notFoundHandler, globalErrorHandler } from '../middlewares/errors';
import indexRouter from "../routes"
import config from '../config';
import { deserializeUser } from '../middlewares/deserializeUser';

export default async function ({ app } :{ app : Express }){
    app.use(cors(
        {
            credentials: true,
            origin: "http://localhost:5173"
        }
    ));
    app.use(morgan(String(config.logs.morgan)));
    app.use(express.urlencoded({extended:false}));
    app.use(express.json());
    app.use(cookieParser());
    
    app.enable('trust-proxy');

    app.use(deserializeUser);
    
    

    app.use("/v1", indexRouter());

    
    
    
    app.use(notFoundHandler);
    app.use(globalErrorHandler);
}