

export interface IIncident{

    title: string
    description: string;
    lat : number;
    lgn : number;
    isEmailSent: boolean;
    genre: string;
    age: number;
}

export interface IncidentDocument extends Document, IIncident{

    title: string;
    description: string;
    lng: number;
    lat: number;
    isEmailSent: boolean;
    genre: string;
    age: number;

}
