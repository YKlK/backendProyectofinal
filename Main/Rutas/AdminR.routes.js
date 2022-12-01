import { Router } from "express";
const routerAdmin = Router()

import * as auth from "./../middleware/authJwt.js"
import * as verify from "./../middleware/verifySignup.js";

import {registrarmascota,getmascota,getmascotaById,actualizarmascota,deletemascotaById} from "./../config/funcionesMascota.js"
import { registrarveterinaria ,getVeterinariaById , getVeterinarias ,actualizarVeterinaria,deleteVeterinariaById  } from "../config/funcionesveterinaria.js";
import { registrarUsuario,getusuarioById,getusuarios,actualizarusuarios,deleteusuarioById } from "../config/funcionesUser.js";
import { singinAdmin } from "../config/funcionesAdmin.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

routerAdmin.post("/api/RegisterVeterinaria",[verify.checkExistingVeterinarian,auth.verifyTokenAdmin],registrarveterinaria)
routerAdmin.get("/api/GetVeterinaria/:ID_veterinaria",auth.verifyTokenAdmin,getVeterinariaById)
routerAdmin.get("/api/GetVeterinarias",auth.verifyTokenAdmin,getVeterinarias)
routerAdmin.put("/api/ActualizarVeterinaria/:veterinaria",auth.verifyTokenAdmin,actualizarVeterinaria)
routerAdmin.delete("/api/DeleteVeterinaria/:veterinaria",auth.verifyTokenAdmin,deleteVeterinariaById)

routerAdmin.post("/api/RegisterUsuario",[verify.checkExistingUser,auth.verifyTokenVeterinarian],registrarUsuario)
routerAdmin.get("/api/GetUsuario/:ID_User",auth.verifyTokenVeterinarian,getusuarioById)
routerAdmin.get("/api/GetUsuarios",auth.verifyTokenVeterinarian,getusuarios)
routerAdmin.put("/api/ActualizarUsuario/:user",auth.verifyTokenVeterinarian,actualizarusuarios)
routerAdmin.delete("/api/DeleteUsuario/:user",auth.verifyTokenVeterinarian,deleteusuarioById)

routerAdmin.post("/api/Registermascota",registrarmascota)
routerAdmin.get("/api/Getmascota/:ID_mascotas",getmascotaById)
routerAdmin.get("/api/Getmascotas",getmascota)
routerAdmin.put("/api/Actualizarmascota/:mascotas",actualizarmascota)
routerAdmin.delete("/api/Deletemascota/:mascotas",deletemascotaById)

routerAdmin.get("/AdminMode",(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.render(require("path").join(__dirname,"..","..","Vistas","Admin"))
})
routerAdmin.post("/AdminMode",singinAdmin)

routerAdmin.get('/AdminMode/Dashboard',(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.render(require("path").join(__dirname,"..","..","Vistas","AdminDash"))
})

export default routerAdmin;