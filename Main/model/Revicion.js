import mongoose from "mongoose";
const enfermedades = mongoose.Schema({

    RecordVacunas:String,
    Enfermedades:String,
    Alergias:String,
    cirugias:String,
    Visitante:{type:mongoose.Schema.Types.ObjectId,ref:"Mascotas"},

    Fecha:Date
},{
    versionKey : false
})

export default mongoose.model("Revicion",enfermedades)