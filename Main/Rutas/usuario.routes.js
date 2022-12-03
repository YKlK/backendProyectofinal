import { Router } from "express";
import { singinUser } from "../config/funcionesUser.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';
import usuario from "../model/usuario.js";
import jwt from "jsonwebtoken";
import { verifyTokenUser } from "./../middleware/authJwt.js";
import {cambiarContra,perfilUser} from "./../config/funcionesUser.js"
const __dirname = dirname(fileURLToPath(import.meta.url));
const router = Router()

router.get("/cambiarcontra",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_usuario","contraseña","contra.mustache"))
})

router.get("/signInUser",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","Login_Veterinaria_User","login"),
    { 
        title:"signInUser",
        path:"/signInUser",
        Gmail:"CorreoElectronico",
        Password:"Contrasena"
    })
})

router.get("/GPSDog",verifyTokenUser,(req,res)=>{
    const id = jwt.verify(req.cookies.tokenUser,process.env.secretuser)

    res.render(join(__dirname,"..","..","Vistas","interfaz_usuario","GPSMASCOTA","GPSmap.mustache"),{
        room:id.id
    })
})

router.get("/mapDog",verifyTokenUser,(req,res)=>{
    const id = jwt.verify(req.cookies.tokenUser,process.env.secretuser)
    res.render(join(__dirname,"..","..","Vistas","interfaz_usuario","ubicacion","map.mustache"),{
        room:id.id
    })
})

router.post("/cambiarcontra",verifyTokenUser,cambiarContra)

router.get("/PerfilUser",verifyTokenUser,perfilUser)

router.get("/interfaz_usuario",verifyTokenUser,(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_usuario","interfaz-usuario.mustache"),{
        PerfilUser:"/PerfilUser",
        mapDog : "/mapDog",
        contra:"/cambiarcontra"
    })
})

// router.get("")

router.post("/signInUser",singinUser)


export default router