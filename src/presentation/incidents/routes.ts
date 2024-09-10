import { Router } from "express";
import { Request, Response } from "express";
import { IncidentController } from "./controller";


export class IncidenRoutes{

    static get routes() : Router{
        const router = Router();
        const incidentController =  new IncidentController();
        const controllers = new IncidentController();
        router.get("/", controllers.getIncidents);
        router.get("/:id", controllers.getIncidentById);
        router.post("/", controllers.createIncident);
        router.put("/:id", controllers.updateIncident);
        router.delete("/:id", controllers.deleteIncident);
        return router;
            
    }
}