import mongoose from "mongoose";
const enfermedades = mongoose.Schema({

    RecordVacunas:[String],
    Enfermedades:[String],
    Alergias:[String],
    cirugias:[String]
},{
    versionKey : false
})

export default mongoose.model("patologias",enfermedades)