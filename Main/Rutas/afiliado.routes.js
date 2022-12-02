import { Router } from "express";
const routerAfiliado = Router()
import usuario from "../model/usuario.js";
import Mascotas from "../model/Mascotas.js";
import { verifyTokenAdmin ,verifyTokenUser,verifyTokenVeterinarian} from "../middleware/authJwt.js";
import { singinveterinaria ,agregarUsuarioyMascota} from "../config/funcionesveterinaria.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';
import { checkExistingUser } from "../middleware/verifySignup.js";
import {agregarenfermedad} from "./../config/funcionesEnfermedades.js"
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

    const mascota = await Mascotas.find().populate('Propietario')
    console.log(mascota)
    console.log(req.body) 

    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrar"),{usuario:mascota})
})
 
routerAfiliado.get("/mostrarUsuario/:user",async (req,res)=>{
    const {user} = req.params
    const Usuario = await Mascotas.findById(user).populate('Propietario').populate("visitas") 
    console.log(Usuario)
    console.log(req.body) 

    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrarUsuario","mostrarUsuario.mustache"),{usuario:Usuario,
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
routerAfiliado.post("/api/agregarUsuarioMascota",agregarUsuarioyMascota)


export default routerAfiliado