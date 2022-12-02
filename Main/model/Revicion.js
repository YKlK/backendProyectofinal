import mongoose from "mongoose";
const enfermedades = mongoose.Schema({

    RecordVacunas:[String],
    Enfermedades:[String],
    Alergias:[String],
    cirugias:[String],
    Fecha:Date
},{
    versionKey : false
})

export default mongoose.model("Revicion",enfermedades)