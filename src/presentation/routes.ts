import { Router } from "express";
import { IncidenRoutes } from "./incidents/routes";


export class AppRoutes{
    static get routes() : Router{
        const router = Router()
        router.use("/api/incidents",IncidenRoutes.routes);
        return router;
    }
}