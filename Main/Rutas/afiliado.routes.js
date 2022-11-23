import { Router } from "express";
const routerAfiliado = Router()
import Usuario from "../model/usuario.js";
import { verifyTokenAdmin ,verifyTokenUser,verifyTokenVeterinarian} from "../middleware/authJwt.js";
import { singinveterinaria } from "../config/funcionesveterinaria.js";

routerAfiliado.get("/signInVeterinarian",(req,res)=>{
    
    res.render(require("path").join(__dirname,"..","..","Vistas","Login_Veterinaria_User","index"),
    {
        title:"signInVeterinarian",
        path:"/signInVeterinarian",
        Gmail:"GmailEmperesarial",
        Password:"Contraseña"
    })
})


routerAfiliado.get("/eliminar",(req,res)=>{
    res.render(require("path").join(__dirname,"..","..","Vistas","interfaz_veterinario","eliminar","eliminar")) 
})
routerAfiliado.get("/editar",(req,res)=>{
    res.render(require("path").join(__dirname,"..","..","Vistas","interfaz_veterinario","editar","editar")) 
})

routerAfiliado.get("/agregar",(req,res)=>{
    res.render(require("path").join(__dirname,"..","..","Vistas","interfaz_veterinario","agregar","agregar")) 
}) 
routerAfiliado.get("/mostrar",async (req,res)=>{
    
    const usuario = await Usuario.find() 
    console.log(usuario)
    console.log(req.body) 

    res.render(require("path").join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrar"),{usuario})
})
 
routerAfiliado.get("/mostrar/:user",async (req,res)=>{
    const {user} = req.params
    const usuario = await Usuario.findById({_id:user}) 
    console.log(usuario)
    console.log(req.body) 

    res.render(require("path").join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrarUsuario","mostrar"),{usuario,
    telefono:`N. Telefono`,
    cedula:`N. Cedula`,
    correo:`Correo Electronico`

    })
})

routerAfiliado.get("/interfaz",verifyTokenUser,(req,res)=>{
    res.render(require("path").join(__dirname,"..","..","Vistas","interfaz_veterinario","interfaz"),{
        agregar:"/agregar",
        editar:"/editar",
        eliminar:"/eliminar",
        mostrar:"/mostrar"
    })
})
routerAfiliado.post("/signInVeterinarian",singinveterinaria)
// routerAfiliado.post("/signInVeterinarian",singinveterinaria)

export default routerAfiliado