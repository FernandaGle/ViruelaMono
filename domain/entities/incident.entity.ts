

export interface IIncident{

    title: string
    description: string;
    lat : number;
    lgn : number;
    isEmailSent: boolean;
}

export interface IncidentDocument extends Document, IIncident{
    

}
