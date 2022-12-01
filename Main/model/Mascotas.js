
import mongoose from "mongoose";
const MascotasSchema= mongoose.Schema({

    Nombre:String,
    Propietario:{type:mongoose.Schema.Types.ObjectId,ref:"usuarios"},
    Raza:String,
    Tipo:String,
    Peso:String,
    Enfermedades:[{type:mongoose.Schema.Types.ObjectId,ref:"patologias"}]
},{
    versionKey : false
})

export default mongoose.model("Mascotas",MascotasSchema)