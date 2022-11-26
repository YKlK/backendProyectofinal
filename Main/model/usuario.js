import  mongoose from "mongoose";

import bcryptjs from "bcryptjs"

const UsuarioSchema= mongoose.Schema({
 
    Nombre: String,
    Edad: Number,
    Direccion : String,
    telefono: Number,
    Cedula: String,
    CorreoElectronico: String,
    Contrasena: String,
    
},{
    versionKey:false
})

UsuarioSchema.static("encryptPassword",  async (Contrasena) => {
    

    const salt = await bcryptjs.genSalt(10)
    const hash = bcryptjs.hash(Contrasena,salt)
    return hash
} )

UsuarioSchema.static("matchPassword" , async function(Contrasena,ContrasenaRecivida){

    return await bcryptjs.compare(Contrasena,ContrasenaRecivida)

})

export default mongoose.model("usuarios",UsuarioSchema)