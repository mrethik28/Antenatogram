import { PrismaClient } from "@prisma/client";
let prisma : PrismaClient; 

export function getClient() : PrismaClient{
    return prisma;
}

export default function(){
    prisma = new PrismaClient();
}
