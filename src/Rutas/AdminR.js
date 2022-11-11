"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routerAdmin = require("express").Router();
const regexAdmin = require(require("path").join(__dirname, "..", "config", "ReGex.js"));
const funcionesAdmin_1 = require("./../config/funcionesAdmin");
const authJwt_1 = require("./../middleware/authJwt");
// routerAdmin.post("/api/RegisterVeterinaria",[checkExistingVeterinarian,verifyTokenVeterinarian],registrarveterinaria)
// routerAdmin.get("/api/GetVeterinaria/:ID_veterinaria",verifyTokenVeterinarian,getVeterinariaById)
// routerAdmin.get("/api/GetVeterinarias",verifyTokenVeterinarian,getVeterinarias)
// routerAdmin.put("/api/ActualizarVeterinaria/:veterinaria",verifyTokenVeterinarian,actualizarVeterinaria)
// routerAdmin.delete("/api/DeleteVeterinaria/:veterinaria",verifyTokenVeterinarian,deleteVeterinariaById)
// routerAdmin.post("/api/RegisterVeterinaria",[checkExistingVeterinarian,verifyTokenVeterinarian],registrarUsuario)
// routerAdmin.get("/api/GetVeterinaria/:ID_User",verifyTokenVeterinarian,getusuarioById)
// routerAdmin.get("/api/GetVeterinarias",verifyTokenVeterinarian,getusuarios)
// routerAdmin.put("/api/ActualizarVeterinaria/:user",verifyTokenVeterinarian,actualizarusuarios)
// routerAdmin.delete("/api/DeleteVeterinaria/:user",verifyTokenVeterinarian,deleteusuarioById)
routerAdmin.post("/api/RegisterVeterinaria", funcionesAdmin_1.registrarveterinaria);
routerAdmin.get("/api/GetVeterinaria/:ID_veterinaria", funcionesAdmin_1.getVeterinariaById);
routerAdmin.get("/api/GetVeterinarias", funcionesAdmin_1.getVeterinarias);
routerAdmin.put("/api/ActualizarVeterinaria/:veterinaria", funcionesAdmin_1.actualizarVeterinaria);
routerAdmin.delete("/api/DeleteVeterinaria/:veterinaria", funcionesAdmin_1.deleteVeterinariaById);
routerAdmin.post("/api/RegisterUsuario", funcionesAdmin_1.registrarUsuario);
routerAdmin.get("/api/GetUsuario/:ID_User", funcionesAdmin_1.getusuarioById);
routerAdmin.get("/api/GetUsuarios", funcionesAdmin_1.getusuarios);
routerAdmin.put("/api/ActualizarUsuarios/:user", funcionesAdmin_1.actualizarusuarios);
routerAdmin.delete("/api/DeleteUsuario/:user", funcionesAdmin_1.deleteusuarioById);
routerAdmin.get("/AdminMode", (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "Admin"));
});
routerAdmin.post("/AdminMode", authJwt_1.verifyTokenAdmin, funcionesAdmin_1.singinAdmin);
routerAdmin.get('/AdminMode/Dashboard', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "AdminDash"));
});
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
module.exports = routerAdmin;
