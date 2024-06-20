import jwt from "jsonwebtoken";
import config from "../config";

const public_key = config.jwt.public_key;
const private_key = config.jwt.private_key;
const refresh_public_key = config.jwt.refresh_public_key
const refresh_private_key = config.jwt.refresh_private_key

type decoded ={
    payload : any,
    expired : boolean
} 

export const getpriv = () => {
    console.log(private_key);
}

//sign jwt 
export function sign_JWT(type: String, payload : object, expiresIn : String | number) {
    if(type == "accesstoken") return jwt.sign(payload,private_key,{algorithm: "RS256", expiresIn:expiresIn});
    return jwt.sign(payload,refresh_private_key,{algorithm: "RS256", expiresIn:expiresIn});
}

//verify jwt
export function verify_JWT( type:String, token : string) : decoded{
    try {
        const decoded = type == "accesstoken" ? jwt.verify(token,public_key) : jwt.verify(token,refresh_public_key);
        return({payload : decoded, expired : false});
    } catch (error : any) {
        return { payload : null , expired : error.message?.include("jwt expired")? false: true};
    }
}