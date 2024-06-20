import { Router } from "express";
import { refresh, logout } from "../../controllers/authHandler";

export default function(app: Router){
    const route = Router();
    app.use("/auth", route);
    route.post('/refresh', refresh);
    route.post('/logout', logout);
    return route;
}