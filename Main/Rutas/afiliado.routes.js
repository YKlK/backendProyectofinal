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
        const dogAux = await Mascotas.findOne({"Propietario":usAux._id}).populate("Propietario")
        console.log(dogAux)
        const visita = await Revicion.create({
            RecordVacunas:recordDeVacunas,
            Enfermedades:enfermedades,
            Alergias:alergia,
            cirugias:cirugias,
            Visitante:dogAux,
            Fecha:Date.now()
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

routerAfiliado.post("/eliminar",async(req,res)=>{
    try{
    const {id} =req.body;

    const elimM = await Mascotas.findByIdAndRemove(id)
    const elimU = await usuario.findByIdAndRemove(elimM.Propietario)
    console.log(elimM)
    res.send("ok")
    }
    catch(err){
        console.log(err)
    }

})

routerAfiliado.post("/editar",async (req,res)=>{
    try{
        const {cedula,username,edad,direccion,telefono,cedula2,email,nombreAnimal,raza,tipo,tamano,color,peso} = req.params

        

        const useaux = await usuario.findOneAndUpdate({"Cedula":cedula},{

            Nombre: username,
            Edad: edad,
            Direccion : direccion,
            telefono: telefono,
            Cedula: cedula2,
            CorreoElectronico: email,
            Contrasena: cedula,

        })
        const mascot = await Mascotas.findOneAndUpdate({"Propietario.Cedula":cedula},{
            Nombre:nombreAnimal,
            Propietario:useaux,
            tamano:tamano,
            Color:color,
            Raza:raza,
            Tipo:tipo,
            Peso:peso
        }).populate("Propietario")
        res.send("ok")
    }
    catch(err){
        console.log(err)
    }
})

routerAfiliado.get("/editar",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","editar","editar"),) 
})

routerAfiliado.get("/agregar",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","agregar","agregar")) 
}) 
routerAfiliado.get("/mostrar",async (req,res)=>{

        try{
    const mascota = await Mascotas.find().populate('Propietario')
    console.log(mascota)
    console.log(req.body) 
    res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrar"),{usuario:mascota,editar:"/editar",
    eliminar:"/eliminar"})
    }
    catch(err){
        console.log("algo salio mal")
    }
})
 
routerAfiliado.get("/mostrarUsuario/:user",async (req,res)=>{
    
    try{
    const {user} = req.params
    const Usuario = await Mascotas.findById(user).populate('Propietario')
    
   
     const revicion = await Revicion.find({"Visitante":Usuario._id})
    

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