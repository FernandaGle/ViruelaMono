import mongoose from "mongoose";

const incidentSchema = new mongoose.Schema({
   title:{
    type: String,
    required: true
   },
    description:{
        type: String, 
        require: true
    },
    lat:{
        type: Number,
        required: true
    },
    lng:{
        type: Number,
        require: true
    }
});

export const IncidentModel = mongoose.model('Incident',incidentSchema);