import { IncidentModel } from "../../src/data/models/incident.model";
import { IIncident } from "../entities/incident.entity";


export class IncidenteDataSource{

    public updateIncident = async(id:string,incident:Partial<IIncidentDocument>)=>{
        await IncidentModel.findByIdAndUpdate(id,{
            title: incident.title,
            description: incident.description,
            lng: incident.lng,
            lat:incident.lat,
            isEmailSent:incident.isEmailSent

        });
    }
}