import { Request, Response, NextFunction } from "express"
import { verify_JWT } from "../utils/jwtUtils"

const jwt = require('jsonwebtoken')

export const verifyJWT = (req : Request, res : Response, next: NextFunction) => {
    const token = String(req.headers.authorization || req.headers.Authorization);
    const decoded = verify_JWT("accesstoken", token);
    console.log(decoded + "haha");
    if(decoded.payload == null) return res.status(403).json({ message: 'Forbidden' })
    req.user = {email : decoded.payload.email, role : decoded.payload.role};
    next()

}