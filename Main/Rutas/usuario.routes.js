import { Router } from "express";
import { singinUser } from "../config/funcionesUser.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';
import usuario from "../model/usuario.js";
import jwt from "jsonwebtoken";
import { verifyTokenUser } from "../middleware/authJwt.js";
import { token } from "morgan";
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

router.get("/GPSDog",(req,res)=>{
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

router.post("/cambiarcontra",verifyTokenUser,async (req,res)=>{
    try{
        
        const {password,password2,corrector} = req.body

        const {tokenUser} = req.cookies
        if(!corrector) return res.send("mal")
        if(password!=password2) return res.redirect("/malacontraseña")
        if(!tokenUser) return res.redirect("/sintoken")
        
        const decode = jwt.verify(tokenUser,process.env.secretuser)
        const usaux = await usuario.findById(decode.id)
        const us = await usuario.findByIdAndUpdate(decode.id,{Nombre: usaux.Nombre,
            Edad: usaux.Edad,
            Direccion : usaux.Direccion,
            telefono: usaux.telefono,
            Cedula: usaux.Cedula,
            CorreoElectronico: usaux.CorreoElectronico,
            Contrasena: password,
            }
        
    ,{
        new: true,
      }) 
      res.send("ok")
    }catch(err){
        console.log(err)
    }

})

router.get("/PerfilUser",verifyTokenUser,async (req,res)=>{
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