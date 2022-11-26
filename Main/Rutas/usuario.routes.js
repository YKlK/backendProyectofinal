import { Router } from "express";
import { singinUser } from "../config/funcionesUser.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router()
router.get("/signInUser",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","Login_Veterinaria_User","index"),
    { 
        title:"signInUser",
        path:"/signInUser",
        Gmail:"CorreoElectronico",
        Password:"Contrasena"
    })
})

router.get("/mapDog",(req,res)=>{
    res.sendFile(join(__dirname,"..","..","Vistas","interfaz_usuario","ubicacion","map.html"))
})
router.get("/PerfilUser",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_usuario","perfil","perfil.mustache"))
})
router.get("/interfaz_usuario",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_usuario","interfaz-usuario.mustache"),{
        PerfilUSer:"/interfaz_usuario/mapDog",
        mapDog : "/mapDog"
        
    })
})

// router.get("")

router.post("/signInUser",singinUser)


export default router