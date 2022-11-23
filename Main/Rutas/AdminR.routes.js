import { Router } from "express";
const routerAdmin = Router()


import * as auth from "./../middleware/authJwt.js"
import * as verify from "./../middleware/verifySignup.js";
import { registrarveterinaria ,getVeterinariaById , getVeterinarias ,actualizarVeterinaria,deleteVeterinariaById  } from "../config/funcionesveterinaria.js";
import { registrarUsuario,getusuarioById,getusuarios,actualizarusuarios,deleteusuarioById } from "../config/funcionesUser.js";
import { singinAdmin } from "../config/funcionesAdmin.js";
routerAdmin.post("/api/RegisterVeterinaria",[verify.checkExistingVeterinarian,auth.verifyTokenAdmin],registrarveterinaria)
routerAdmin.get("/api/GetVeterinaria/:ID_veterinaria",auth.verifyTokenAdmin,getVeterinariaById)
routerAdmin.get("/api/GetVeterinarias",auth.verifyTokenAdmin,getVeterinarias)
routerAdmin.put("/api/ActualizarVeterinaria/:veterinaria",auth.verifyTokenAdmin,actualizarVeterinaria)
routerAdmin.delete("/api/DeleteVeterinaria/:veterinaria",auth.verifyTokenAdmin,deleteVeterinariaById)

routerAdmin.post("/api/RegisterUsuario",[verify.checkExistingUser,auth.verifyTokenVeterinarian],registrarUsuario)
routerAdmin.get("/api/GetUsuario/:ID_User",getusuarioById)
routerAdmin.get("/api/GetUsuarios",getusuarios)
routerAdmin.put("/api/ActualizarUsuario/:user",actualizarusuarios)
routerAdmin.delete("/api/DeleteUsuario/:user",deleteusuarioById)

// routerAdmin.post("/api/Registermascota",registrarmascota)
// routerAdmin.get("/api/Getmascota/:ID_mascotas",getmascotaById)
// routerAdmin.get("/api/Getmascotas",getmascota)
// routerAdmin.put("/api/Actualizarmascota/:mascotas",actualizarmascota)
// routerAdmin.delete("/api/Deletemascota/:mascotas",deletemascotaById)

routerAdmin.get("/AdminMode",(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.render(require("path").join(__dirname,"..","..","Vistas","Admin"))
})
routerAdmin.post("/AdminMode",singinAdmin)

routerAdmin.get('/AdminMode/Dashboard',(req,res)=>{
    res.setHeader('Content-Type', 'text/html');
    res.render(require("path").join(__dirname,"..","..","Vistas","AdminDash"))
})



// (req:any,res:any)=>{
//     const {Email , Password} = req.body;
//     let error = {Emailerr:"",Passwerr:""
//       }
//     if(!regexAdmin.Email.test(Email) || regexAdmin.Email ==""){
//         error.Emailerr="Ingresa el Gmail Correctamente" 
        
//     }
//     if(!regexAdmin.Password.test(Password) || regexAdmin.Password ==""){
//         error.Passwerr="Ingresa el Password Correctamente"
//     }
//     if(Object.keys(error).length){
//         console.log(error)
//       return res.render(require("path").join(__dirname,"..","..","vistas","Admin","index"),
//             {   
//                 error:error,
//                 Email:Email,
//                 Password:Password
//             })
//     }
//      res.redirect()
    
// }


export default routerAdmin;