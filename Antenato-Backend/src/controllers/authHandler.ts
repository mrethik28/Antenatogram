import { Response, Request, NextFunction } from "express"
import { sign_JWT, verify_JWT } from "../utils/jwtUtils";
import { patient } from "../services/patient";

export const refresh = async (req : Request, res : Response, next : NextFunction) => {
    const cookies = req.cookies;
    if(!cookies.refreshtoken){
        res.status(401).json({message : "Unathorized"});
    }

    const refreshToken = cookies.refreshtoken;

    const decoded = verify_JWT("refreshtoken", refreshToken);
    if(decoded.payload == null){
        res.status(403).json({message : "Unauthorizzed"});
    } 
    else{
        const email = decoded.payload.email;
        const role = decoded.payload.role;
        if(! await patient.Exists(email)) res.status(403).json({message : "User not found"});
        const accessToken = sign_JWT("accesstoken", {email: email, role : role }, "11m");
        res.json({accessToken});
    }
    
}

export const logout = (req : Request, res : Response, next : NextFunction) => {
    const cookies = req.cookies;
    if(! cookies.refreshtoken ) res.status(204);
    res.clearCookie('refreshtoken', {
        httpOnly : true, 
        sameSite : 'none', 
    }).json({message : "cookie cleared"});

}