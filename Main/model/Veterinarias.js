import mongoose from "mongoose";



const VeterinariasSchema =mongoose.Schema({
    NombreSucursal: String,
    Ubicacion : String,
    GmailEmperesarial: String,
    Contraseña: String,
   
},{
    versionKey:false
}) 


export default mongoose.model("Veterinarias",VeterinariasSchema)