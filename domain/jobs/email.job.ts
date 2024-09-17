import cron from 'node-cron';
import { IncidentModel } from '../../src/data/models/incident.model';
import { EmailService } from '../service/email.service';
import { generateIncidentEmailTemplate } from '../template/email.template';


export const emailJob = () => {
    cron.schedule("*/10 * * * * *",async ()=>{
        const emailService = new EmailService();
        console.log("Ejecución cada 10 segundos")
        try {
            const incidents = await IncidentModel.find({isEmailSent:false});
            if(!incidents.length){
                console.log("No hay incidentes por el momento");
                return;
            }
            console.log(`Procesando ${incidents.length} incidentes`)
            await Promise.all(
                incidents.map(async (incident)=>{
                    try {
                        const htmlBody = generateIncidentEmailTemplate(
                            incident.title,
                            incident.description,
                            incident.lat,
                            incident.lng,
                            incident.genre,
                            incident.age
                        )
                        await emailService.sendEmail({
                            to: "fg282061@gmail.com",
                            subject: `Incidente: ${incident.title}`,
                            htmlbody: htmlBody
                        });
                        console.log(`Email enviado para el incidente con id: ${incident._id}`)
                        let updateIncident = {
                            title: incident.title,
                            description: incident.description,
                            lat: incident.lat,
                            lng: incident.lng,
                            isEmailSent: true,
                            genre: incident.genre,
                            age: incident.age
                        };
                        await IncidentModel.findByIdAndUpdate(incident._id, updateIncident);
                        console.log(`Incidente actualizado para el Id: ${incident._id}`);
                    } catch (error) {
                        console.error("Error al procesar el incidente");
                    }
                })
            );
        } catch (error) {
            
        }

    })
};
