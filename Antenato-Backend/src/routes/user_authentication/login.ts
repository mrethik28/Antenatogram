import { Router } from "express";
import {loginUser} from "../../controllers/loginHandler";

export default function(app: Router){
    const route = Router();
    app.use("/login", route);
    route.post('/', loginUser);
    return route;
}