import { Request, Response, NextFunction, response } from "express"
import { patient } from "../services/patient";
import bcrypt from "bcryptjs"
import { sign_JWT } from "../utils/jwtUtils";


const encryptPassword = async (password : string) => {
    const salt = await bcrypt.genSalt(12);
    const encrypted = await bcrypt.hash(password,salt);
    return encrypted;
}


export const registerUser = async (req:Request, res:Response, next:NextFunction) => {
    const userDTO = req.body;
    const email = userDTO.email;
    const password = await encryptPassword(userDTO.pwd);
    
    

    if(await patient.Exists(email)){
        console.log("rejected same email");
        res.status(402);
        return res.json({message : "user already exits"});
    } 

    patient.insertEntry(email,password)
    .then((response) => {
        res.status(200);
        const accesstoken = sign_JWT('accesstoken',{type: "access", email: email, role : "patient"},'15s');
        const refreshtoken = sign_JWT('refreshtoken',{type: "refresh", email: email, role : "patient"},'1m');
        res.cookie("refreshtoken", refreshtoken, {
            httpOnly : true,
            sameSite : 'none'
        })
        res.json({accesstoken});        
        console.log(response);
    })
    .catch((error) => {
        res.status(401);
        console.log(error);
        next(error);
    })  
    
}