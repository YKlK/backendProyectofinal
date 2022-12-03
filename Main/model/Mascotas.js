
import mongoose from "mongoose";
const MascotasSchema= mongoose.Schema({

    Nombre:String,
    Propietario:{type:mongoose.Schema.Types.ObjectId,ref:"usuarios"},
    tamano:String,
    Color:String,
    Raza:String,
    Tipo:String,
    Peso:String,
},{
    versionKey : false
})

export default mongoose.model("Mascotas",MascotasSchema)