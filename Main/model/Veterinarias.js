import mongoose from "mongoose";

import bcryptjs from "bcryptjs"



const VeterinariasSchema =mongoose.Schema({
    NombreSucursal: String,
    Ubicacion : String,
    GmailEmperesarial: String,
    Contraseña: String,
   
},{
    versionKey:false
}) 



VeterinariasSchema.static("encryptPassword",  async (Contrasena) => {
    

    const salt = await bcryptjs.genSalt(10)
    const hash = bcryptjs.hash(Contrasena,salt)
    return hash
} )

VeterinariasSchema.static("matchPassword" , async function(Contrasena,ContrasenaRecivida){

    return await bcryptjs.compare(Contrasena,ContrasenaRecivida)

})

export default mongoose.model("Veterinarias",VeterinariasSchema)