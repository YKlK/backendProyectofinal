import { Router } from "express";
import { singinUser } from "../config/funcionesUser.js";

const router = Router()
router.get("/signInUser",(req,res)=>{
    res.render(require("path").join(__dirname,"..","..","Vistas","Login_Veterinaria_User","index"),
    { 
        title:"signInUser",
        path:"/signInUser",
        Gmail:"CorreoElectronico",
        Password:"Contrasena"
    })
})

router.post("/signInUser",singinUser)


export default router