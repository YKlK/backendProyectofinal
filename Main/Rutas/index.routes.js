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
    res.send("ni idea")
})