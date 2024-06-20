import expressLoader from "./express";
import primsaLoader from "./prisma"
import type { Express } from "express";

export default async function({ app } : { app:Express } ){
    await expressLoader({app});
    console.log("Express ready");

    primsaLoader();
    console.log("Prisma ready");
}