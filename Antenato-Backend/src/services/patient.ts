import { getClient } from "../loaders/prisma";

async function insertEntry(email: string, password: string){
    const client = getClient();
    await client.patient.create({
        data:{
            email,
            password
        }
    })
}

async function userExists(email:string) : Promise<boolean> {
    const client = getClient();
    try{
        await client.patient.findUniqueOrThrow({where : {email : email}})
        return true;
    }
    catch(error){
        return Promise.reject(error);
    }
}


async function getHashedPassword(email:string){
    const client = getClient();
    const hashedPassword = await client.patient.findUnique({where:{email:email}, select:{password:true}});
    return String(hashedPassword?.password);
}


export const patient = {
    insertEntry : insertEntry,
    Exists : userExists,
    getHashedPassword : getHashedPassword
}