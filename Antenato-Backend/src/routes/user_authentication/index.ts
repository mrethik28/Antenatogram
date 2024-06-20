import { Router } from "express";

import loginRoute from "./login"
import registerRoute from "./register"
import authRoute from "./auth"

import { verifyJWT } from "../../middlewares/verifyJWT";

export default function( app: Router ){
    const route = Router();
    app.use('/', route);
    authRoute(route);
    loginRoute(route);
    registerRoute(route);
    return route;
}