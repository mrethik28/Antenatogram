import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const envFound = dotenv.config();
if(envFound.error){
    throw new Error("no .env file found");
}

export default {
    port : parseInt(String(process.env.PORT), 10),
    logs : {
        morgan : process.env.MORGAN
    },
    db:{
        db_url : process.env.DB_URL
    },
    jwt:{
        public_key : process.env.JWT_PUBLICKEY,
        private_key : process.env.JWT_PRIVATEKEY,
        refresh_public_key : process.env.JWT_REFRESH_PUBLICKEY,
        refresh_private_key : process.env.JWT_REFRESH_PRIVATEKEY 

    }
};