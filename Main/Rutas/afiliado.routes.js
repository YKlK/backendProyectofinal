import { Router } from "express";
const routerAfiliado = Router()
import usuario from "../model/usuario.js";
import { verifyTokenAdmin ,verifyTokenUser,verifyTokenVeterinarian} from "../middleware/authJwt.js";
import { singinveterinaria } from "../config/funcionesveterinaria.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

routerAfiliado.get("/signInVeterinarian",(req,res)=>{
    
    res.render(join(__dirname,"..","..","Vistas","Login_Veterinaria_User","login"),
    {
        title:"signInVeterinarian",
        path:"/signInVeterinarian",
        Gmail:"GmailEmperesarial",
        Password:"Contraseña"
    })
})


routerAfiliado.get("/eliminar",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","eliminar","eliminar")) 
})
routerAfiliado.get("/editar",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","editar","editar")) 
})

routerAfiliado.get("/agregar",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","agregar","agregar")) 
}) 
routerAfiliado.get("/mostrar",async (req,res)=>{

    const Usuario = await usuario.find() 
    console.log(usuario)
    console.log(req.body) 

    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrar"),{usuario:Usuario})
})
 
routerAfiliado.get("/mostrarUsuario/:user",async (req,res)=>{
    const {user} = req.params
    const Usuario = await usuario.findById({_id:user}) 
    console.log(Usuario)
    console.log(req.body) 

    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrarUsuario","mostrarUsuario"),{usuario:Usuario,
    telefono:`N. Telefono`,
    cedula:`N. Cedula`,
    correo:`Correo Electronico`

    })
})

routerAfiliado.get("/interfaz_veterinario",verifyTokenVeterinarian,(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","interfaz"),{
        agregar:"/agregar",
        editar:"/editar",
        eliminar:"/eliminar",
        mostrar:"/mostrar"
    })
})
routerAfiliado.post("/signInVeterinarian",singinveterinaria)
// routerAfiliado.post("/signInVeterinarian",singinveterinaria)

export default routerAfiliado