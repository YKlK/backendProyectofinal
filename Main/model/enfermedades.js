import mongoose from "mongoose";
const enfermedades = mongoose.Schema({

    RecordVacunas:[String],
    Enfermedades:[String],
    Alergias:[String],
    cirugias:[String],
    Fecha
},{
    versionKey : false
})

export default mongoose.model("Revicion",enfermedades)