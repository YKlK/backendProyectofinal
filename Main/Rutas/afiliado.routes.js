import { Router } from "express";
import Revicion from "../model/Revicion.js";
const routerAfiliado = Router()
import usuario from "../model/usuario.js";
import Mascotas from "../model/Mascotas.js";
import { verifyTokenAdmin ,verifyTokenUser,verifyTokenVeterinarian} from "../middleware/authJwt.js";
import { singinveterinaria ,agregarUsuarioyMascota} from "../config/funcionesveterinaria.js";
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));
import { checkExistingUser } from "../middleware/verifySignup.js";
import {agregarenfermedad} from "./../config/funcionesEnfermedades.js"
import router from "./usuario.routes.js";


routerAfiliado.get("/signInVeterinarian",(req,res)=>{
    
    res.render(join(__dirname,"..","..","Vistas","Login_Veterinaria_User","login"),
    {
        title:"signInVeterinarian",
        path:"/signInVeterinarian",
        Gmail:"GmailEmperesarial",
        Password:"Contraseña"
    })
})

router.post("/nuevaVisita",async (req,res)=>{
    try{
        const {Cedula,recordDeVacunas,enfermedades,alergia,cirugias} = req.body

        const usAux = await usuario.findOne({"Cedula":Cedula})
        console.log(usAux)
        const dogAux = await Mascotas.findOne({"Propietario":usAux._id})
        console.log(dogAux)
        const visita = await Revicion.create({
            RecordVacunas:recordDeVacunas,
            Enfermedades:enfermedades,
            Alergias:alergia,
            cirugias:cirugias,
            Visitante:dogAux
        })
        console.log(visita)
        res.send("")
    }
    catch(err){
        console.log(err)
        res.send("no ok")
    }
    
})

router.get("/nuevaVisita",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","patologia","agregar-patologia.mustache"))
})

routerAfiliado.get("/eliminar",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","eliminar","eliminar")) 
})
routerAfiliado.get("/editar",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","editar","editar")) 
})

routerAfiliado.get("/agregar",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","agregar","agregar")) 
}) 
routerAfiliado.get("/mostrar",async (req,res)=>{

        try{
    const mascota = await Mascotas.find().populate('Propietario')
    console.log(mascota)
    console.log(req.body) 
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrar"),{usuario:mascota})
    }
    catch(err){
        console.log("algo salio mal")
    }
})
 
routerAfiliado.get("/mostrarUsuario/:user",async (req,res)=>{
    // try{

    //     const us = await usuario.findOne({Cedula:cedula})
    //     const mascota = await Mascotas.findOne({'Propietario':us._id}).populate('Propietario')
        
    //     console.log(mascota)
    //     console.log(req.query) 
    //     res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrar"),{usuario:mascota})}
    //     catch(err){
    //         console.log("enviaste mal la cedula")
    //     }
    try{
    const {user} = req.params
    const Usuario = await Mascotas.findById(user).populate('Propietario')
    
    // const us = await usuario.find

    // const mascota = await Mascotas.findOne({'Propietario':us._id}).populate('Propietario')
     const revicion = await Revicion.find({"Visitante":Usuario._id})
    // console.log(Usuario)
    // console.log(req.body) 

    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrarUsuario","mostrarUsuario.mustache"),{usuario:Usuario,revicion
    })}
    catch(err){
        console.log(err)
    }
})

routerAfiliado.get("/interfaz_veterinario",verifyTokenVeterinarian,(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","interfaz"),{
        agregar:"/agregar",
        editar:"/editar",
        eliminar:"/eliminar",
        mostrar:"/mostrar",
        visita:"/nuevaVisita"
    })
})
routerAfiliado.post("/signInVeterinarian",singinveterinaria)
// routerAfiliado.post("/signInVeterinarian",singinveterinaria)
routerAfiliado.post("/api/agregarUsuarioMascota",agregarUsuarioyMascota)


export default routerAfiliado