import { Router } from "express";
import { singinUser } from "../config/funcionesUser.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';
import usuario from "../model/usuario.js";
import jwt from "jsonwebtoken";
const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router()
router.get("/signInUser",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","Login_Veterinaria_User","login"),
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
router.get("/PerfilUser",async (req,res)=>{
    const veryfy = jwt.verify(req.cookies.tokenUser,process.env.secretuser)
    const user = await usuario.findById(veryfy.id)
    console.log(user)
    const {Nombre,
    Edad,
    Direccion,
    telefono,
    Cedula,
    CorreoElectronico} = user
    res.render(join(__dirname,"..","..","Vistas","interfaz_usuario","perfil","perfil.mustache"),{Nombre,
        Edad,
        Direccion,
        telefono,
        Cedula,
        CorreoElectronico})
})
router.get("/interfaz_usuario",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_usuario","interfaz-usuario.mustache"),{
        PerfilUser:"/PerfilUser",
        mapDog : "/mapDog"
        
    })
})

// router.get("")

router.post("/signInUser",singinUser)


export default router