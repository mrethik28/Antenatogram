import { Router } from "express";
import authenticationRouter from "./user_authentication";

export default function(){
    const app = Router();
    
    authenticationRouter(app);
    return app;
}
