import { NextFunction, Request, Response, Router } from "express";
import { registerUser } from "../../controllers/singupHandler";

export default function(app: Router){
    const route : Router = Router();
    app.use("/register", route);
    route.post('/', registerUser);
    return route;
}