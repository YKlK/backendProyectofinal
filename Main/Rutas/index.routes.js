import { Router } from "express"
import {dirname,join} from "node:path"

import { fileURLToPath } from 'url';
import transporter from "../config/Emails.js";
const __dirname = dirname(fileURLToPath(import.meta.url));

const route = Router();
// console.log(join(__dirname,"..","..","Vistas","landing","index.mustache"))
route.get("/",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","landing","index.mustache"))
}) 
export default route

route.post("/api/sendemail",(req,res)=>{
const {nombre,email,asunto,mensaje} = req.body
    transporter(nombre,email,asunto,mensaje)
    res.redirect("/")
})

route.get("/logOut",(req,res)=>{
    if(req.cookies.tokenAdmin) res.clearCookie("tokenAdmin")
    if(req.cookies.tokenVeterinaria) res.clearCookie("tokenVeterinaria")
    if(req.cookies.tokenUser) res.clearCookie("tokenUser")
    res.redirect("/")
})

route.get("/Message",(req,res)=>{
    const {mensaje,action}=req.body
    res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"))
})
route.get("/contacta",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","contacta","contacta.mustache"))
})