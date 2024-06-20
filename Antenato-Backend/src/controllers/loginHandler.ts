import { Request, Response, NextFunction, response } from "express"
import bcrypt from "bcryptjs"
import { patient } from "../services/patient";
import { error } from "console";
import { sign_JWT, verify_JWT } from "../utils/jwtUtils";

const comparePassword = async (email: string, password:string) :Promise<boolean> => {
    const hashedPassword = await patient.getHashedPassword(email);
    const match = await bcrypt.compare(password, hashedPassword);
    return Boolean(match);
}

export const loginUser = async (req:Request, res:Response, next:NextFunction) => {
    
   const userDTO = req.body;
    
    let exists;
    try {
        exists = await patient.Exists(userDTO.email);
    } catch (error) {
        res.status(450);
        next(error);
    }
    if(exists){
        const match = await comparePassword(userDTO.email, userDTO.pwd);
        if(match){
            const accesstoken = sign_JWT("accesstoken",{email : userDTO.email, role : "patient"},"10s");
            const refreshtoken = sign_JWT("refreshtoken",{email : userDTO.email, role : "patient"},"1d");
            res.cookie("refreshtoken",refreshtoken,{
                maxAge : 30000,
                httpOnly : true,
                sameSite : 'none',

            });
            res.status(200);
            const user = {email : userDTO.email, role : "patient"}
            res.json({user, accesstoken});
        }
        else{
            res.status(451);
            next(new Error("password incorrect"));
        }
    }
    
}
