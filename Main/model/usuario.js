import  mongoose from "mongoose";

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



export default mongoose.model("usuarios",UsuarioSchema)