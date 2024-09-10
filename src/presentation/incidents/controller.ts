import { Request, Response } from "express"
import { IncidentModel } from "../../data/models/incident.model"
import { EmailService } from "../../../domain/services/email.service";

export class IncidentController {

    public getIncidents = async (req: Request, res: Response) => {
        try {
            const incidents = await IncidentModel.find();
            return res.json(incidents);

        } catch (error) {
            return res.json([]);

        }
    }

    public createIncident = async (req: Request, res: Response) => {
        try {
            const { title, description, lat, lng } = req.body;
            const newIncident = await IncidentModel.create({
                title,
                description,
                lat,
                lng,
            });
            // const emailService = new EmailService();
            // await emailService.sendEmail({
            //     to: "pedro.r.flores13@gmail.com",
            //     subject: `Incidente: ${newIncident.title}`,
            //     htmlbody: `<h1>${newIncident.description}</h1>`
            // })
            res.json(newIncident);
        } catch (error) {
            res.json({ message: "Error creando registro" });
        }
    };

    public getIncidentById = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const incident = await IncidentModel.findById(id);
            return res.json(incident);
        } catch (error) {
            return res.json({ message: "Ocurrio un error al traer el incidente" })
        }
    }

    public updateIncident = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { title, description, lat, lng } = req.body;

            const updatedIncident = await IncidentModel.findByIdAndUpdate(
                id,
                { title, description, lat, lng },
                { new: true }  // Retorna el documento actualizado
            );

            if (!updatedIncident) {
                return res.status(404).json({ message: "Incidente no encontrado" });
            }

            return res.json(updatedIncident);
        } catch (error) {
            return res.status(500).json({ message: "Ocurrió un error al actualizar el incidente" });
        }
    }

    public deleteIncident = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const deletedIncident = await IncidentModel.findByIdAndDelete(id);
            return res.json({ message: "Incidente eliminado con éxito" });
        } catch (error) {
            return res.json({ message: "Ocurrió un error al eliminar el incidente" });
        }
    }
}