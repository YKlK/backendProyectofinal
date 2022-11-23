
import mongoose from "mongoose";
const MascotasSchema= mongoose.Schema({

    Nombre:String,
    Propietario:{type:Schema.Types.ObjectId,ref:"usuarios"},
    Raza:String,
    Tipo:String,
    Peso:String,
    RecordVacunas:[String],
    Enfermedades:[String],
    Alergias:[String],
},{
    versionKey : false
})

export default mongoose.model("Mascotas",MascotasSchema)