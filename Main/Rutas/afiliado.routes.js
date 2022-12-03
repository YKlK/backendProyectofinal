import { Router } from "express";
import Revicion from "../model/Revicion.js";
const routerAfiliado = Router()
import usuario from "../model/usuario.js";
import Mascotas from "../model/Mascotas.js";
import { verifyTokenAdmin ,verifyTokenUser,verifyTokenVeterinarian} from "../middleware/authJwt.js";
import { singinveterinaria ,agregarUsuarioyMascota} from "../config/funcionesveterinaria.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';
import {nuevaVisita,editar , eliminar , mostrar} from "./../config/funcionesveterinaria.js"
const __dirname = dirname(fileURLToPath(import.meta.url));
import { checkExistingUser } from "../middleware/verifySignup.js";
import {agregarenfermedad} from "./../config/funcionesEnfermedades.js"
import router from "./usuario.routes.js";


routerAfiliado.get("/signInVeterinarian",(req,res)=>{  
    res.render(join(__dirname,"..","..","Vistas","Login_Veterinaria_User","login"),
    {
        title:"signInVeterinarian",
        path:"/signInVeterinarian",
        Gmail:"GmailEmperesarial",
        Password:"Contraseña"
    })
})

router.post("/nuevaVisita",verifyTokenVeterinarian,nuevaVisita)

router.get("/nuevaVisita",verifyTokenVeterinarian,(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","patologia","agregar-patologia.mustache"))
})

routerAfiliado.get("/eliminar",verifyTokenVeterinarian,(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","eliminar","eliminar")) 
})

routerAfiliado.post("/eliminar",verifyTokenVeterinarian,eliminar)

routerAfiliado.post("/editar",verifyTokenVeterinarian,editar)

routerAfiliado.get("/editar",verifyTokenVeterinarian,(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","editar","editar"),) 
})

routerAfiliado.get("/agregar",verifyTokenVeterinarian,(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","agregar","agregar")) 
}) 
routerAfiliado.get("/mostrar",verifyTokenVeterinarian,mostrar)
   

routerAfiliado.get("/mostrarUsuario/:user",verifyTokenVeterinarian,async (req,res)=>{
    
    try{
    const {user} = req.params
    const Usuario = await Mascotas.findById(user).populate('Propietario')
    
   
     const revicion = await Revicion.find({"Visitante":Usuario._id})
    

    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrarUsuario","mostrarUsuario.mustache"),{usuario:Usuario,revicion
    })}
    catch(err){
        console.log(err)
    }
})

routerAfiliado.get("/interfaz_veterinario",verifyTokenVeterinarian,(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","interfaz"),{
        agregar:"/agregar",
        editar:"/editar",
        eliminar:"/eliminar",
        mostrar:"/mostrar",
        visita:"/nuevaVisita"
    })
})

routerAfiliado.post("/signInVeterinarian",singinveterinaria)
// routerAfiliado.post("/signInVeterinarian",singinveterinaria)
routerAfiliado.post("/api/agregarUsuarioMascota",verifyTokenVeterinarian,agregarUsuarioyMascota)


export default routerAfiliado