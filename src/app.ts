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

const caseSchema = new mongoose.Schema({
  title: String,
  description: String,
  lng: Number,
  lat: Number,
    isEmailSent: Boolean,
    genre: String,
    age: Number,
  date: { type: Date, default: Date.now },
});
const Case = mongoose.model('Case', caseSchema);

app.post('/cases', async (req, res) => {
  const newCase = new Case(req.body);
  await newCase.save();
  res.status(201).send(newCase);
});

app.get('/cases', async (req, res) => {
  const cases = await Case.find();
  res.send(cases);
});

app.get('/cases/lastweek', async (req, res) => {
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const recentCases = await Case.find({ date: { $gte: oneWeekAgo } });
  res.send(recentCases);
});

app.put('/cases/:id', async (req, res) => {
  const caseId = req.params.id;
  const updatedCase = await Case.findByIdAndUpdate(caseId, req.body, { new: true });
  res.send(updatedCase);
});

app.delete('/cases/:id', async (req, res) => {
  const caseId = req.params.id;
  await Case.findByIdAndDelete(caseId);
  res.json({ message: 'Caso eliminado' });
});





