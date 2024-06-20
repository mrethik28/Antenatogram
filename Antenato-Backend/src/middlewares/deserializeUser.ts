import { NextFunction, Request, Response } from "express";
import { verify_JWT } from "../utils/jwtUtils";
export function deserializeUser(req: Request, res: Response, next : NextFunction){
    const {accessToken} = req.cookies;
    
    if(!accessToken) return next();

    const {payload} = verify_JWT("accesstoken", accessToken);

    if(payload){
        req.user = payload;
        return next();

    }
    return next();
}