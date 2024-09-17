import express, {Request,Response} from 'express';
import { envs } from './config/envs';
import 'dotenv/config' 
import { MongoDatabase } from "./data/init";
import { IncidentModel } from "./data/models/incident.model";
import { AppRoutes } from "./presentation/routes";
import { emailJob } from '../domain/jobs/email.job';
import mongoose from 'mongoose';

console.log(envs.PORT);
const app = express();

app.get("/",(req:Request,res:Response)=> {
res.send(" ")
app.use(express.json());
app.use(AppRoutes.routes);

(async () =>
    await MongoDatabase.connect({
      dbName: envs.MONGO_DB,
      mongoUrl: envs.MONGO_URL ?? "",
    }))
();

app.listen(envs.PORT,()=>{
console.log("Corriendo puerto 3000")
})


});






