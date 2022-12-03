import Veterinarias from "../model/Veterinarias.js"
import usuario from "../model/usuario.js"
import Mascotas from "../model/Mascotas.js";
import jwt from "jsonwebtoken";
import { fileURLToPath } from 'url';
import transporter from "../config/Emails.js";
import { join ,dirname} from "path";
const __dirname = dirname(fileURLToPath(import.meta.url));



export const singinveterinaria = async (req,res) => {
    try{
      
    const {Contraseña,GmailEmperesarial} = req.body
    if(GmailEmperesarial=="") new Error("Gmail Vacio")
    if(Contraseña=="") new Error("Contraseña Vacio")
    if(req.cookies.tokenAdmin) res.clearCookie("tokenAdmin")
    if(req.cookies.tokenVeterinaria) res.clearCookie("tokenVeterinaria")
    if(req.cookies.tokenUser) res.clearCookie("tokenUser")

    const veterinariaFound = await Veterinarias.findOne({GmailEmperesarial:GmailEmperesarial})

    if (!veterinariaFound){ return res.status(404).json({message:"noooo"})}

    const matchPassword = Contraseña==veterinariaFound.Contraseña

    if (!matchPassword) return res.status(401).json({token: null,message:"contraseña invalida como en los teleton xdxdxdd"})
    
    const token = jwt.sign({id:veterinariaFound._id},process.env.secretveterinarian,{expiresIn:"1d"})
    
    res.cookie("tokenVeterinaria",token,{
      sameSite:"strict",
      maxAge:86400000,
      httpOnly:true
    })
  
    res.redirect("/interfaz_veterinario")}
    catch(err){
      res.status(401).send(err.message)
    }
  }
  
  export const registrarveterinaria=async(req,res)=>{
    try{      
      const {
        NombreSucursal,
        Ubicacion ,
        GmailEmperesarial,
        Contraseña ,
        } = req.body 
  
      const veteri = new Veterinarias({
        NombreSucursal,
        Ubicacion,
        GmailEmperesarial,
        Contraseña,
      })
            
      const token = await veteri.save() 
  
      const JWT = jwt.sign({veteri_id:token._id},process.env.secret)
  
      res.status(200).json(JWT)
    }
    catch(err){
      res.status(401).json({err})
    }
  }
  
  //me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu
  export const getVeterinariaById = async (req, res) => {
    try{  
    const { ID_veterinaria } = req.params;
    
      const getveterinariaid = await Veterinarias.findById(ID_veterinaria);
      res.status(200).json(getveterinariaid);
    }
    catch(err){
      res.status(401).json({err})
    }

    }; 
  //me servira para imprimir en pantallla todas las veterinarias disponibles papu
  export const getVeterinarias = async (req, res) => {
  
          const listadoVeterinarias = await Veterinarias.find();
          return res.json(listadoVeterinarias);
        };
  //me servira para actualizar la triple pta veterinaria (borrar al rato)
  export const actualizarVeterinaria = async (req, res) => {
    try{
    const {
      NombreSucursal,
      Ubicacion ,
      GmailEmperesarial,
      Contraseña ,
      }=  req.body 
  
      const updatedVeterinarian = await Veterinarias.findByIdAndUpdate(
        req.params.veterinaria,
       {
      NombreSucursal,
      Ubicacion ,
      GmailEmperesarial,
      Contraseña,
       },
        {
          new: true,
        }
      );
      res.status(200).json(updatedVeterinarian);
    }
    catch(err){
      res.status(401).json({err})
    }};

  //borrar atraves del id alv
    export const deleteVeterinariaById = async (req, res) => {
        try{
          const { veterinaria } = req.params;
        
          const veteri = await Veterinarias.findByIdAndDelete(veterinaria);
          res.status(200).json();
        }
        catch(err){
          res.status(401).json(err);}
        };
  

    export const agregarUsuarioyMascota = async (req,res)=>{
      try{
          const {username,edad,direccion,telefono,cedula,email,nombreAnimal,raza,tipo,tamano,color,peso} = req.body;

          const user = await usuario.create({
            Nombre: username,
            Edad: edad,
            Direccion : direccion,
            telefono: telefono,
            Cedula: cedula,
            CorreoElectronico: email,
            Contrasena: cedula,
          })

          const Mascota = await Mascotas.create({
            Nombre:nombreAnimal,
            Propietario:user,
            tamano:tamano,
            Color:color,
            Raza:raza,
            Tipo:tipo,
            Peso:peso,})

          
            res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:"usuario guardado correctamente",action:"/mostrar"})
          }
          catch(err){
            res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:"algo salio mal intentelo mas tarde o contacte con su proveedor",action:"/contacta"});}
        }
  
export const nuevaVisita = async (req,res)=>{
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
      res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:"visita guardada con exito",action:"/mostrar"})
  }
  catch(err){
      
      res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:`algo salio mal intentelo mas tarde o contacte con su proveedor de esto: ${err}`,action:"/contacta"})
  }
  
}

export const eliminar = async(req,res)=>{
  try{
  const {id} =req.body;

  const elimM = await Mascotas.findByIdAndRemove(id)
  const elimU = await usuario.findByIdAndRemove(elimM.Propietario)
  console.log(elimM)
  res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:"usuario eliminado con exito",action:"/mostrar"})
  }
  catch(err){
    res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:`algo salio mal intentelo mas tarde o contacte con su proveedor de esto: ${err}`,action:"/contacta"})

  }

}

export const editar = async (req,res)=>{
  try{
      const {cedula,username,edad,direccion,telefono,cedula2,email,nombreAnimal,raza,tipo,tamano,color,peso} = req.params

      
      console.log(cedula)
      const useaux = await usuario.findOneAndUpdate({"Cedula":cedula},{

          Nombre: username,
          Edad: edad,
          Direccion : direccion,
          telefono: telefono,
          Cedula: cedula2,
          CorreoElectronico: email,
          Contrasena: cedula,

      },{
          new: true,
        })
        console.log(useaux)
      const mascot = await Mascotas.findOneAndUpdate({"Propietario.Cedula":cedula},{
          Nombre:nombreAnimal,
          Propietario:useaux._id,
          tamano:tamano,
          Color:color,
          Raza:raza,
          Tipo:tipo,
          Peso:peso
      },{
          new: true,
        })
      res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:"usuario editado correctamente",action:"/mostrar"})
  }
  catch(err){
    res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:`algo salio mal intentelo mas tarde o contacte con su proveedor de esto: ${err}`,action:"/contacta"})
      
  }
}

export const mostrar = async (req,res)=>{
  const {cedula} = req.query
  if(cedula){
      try{
      const us = await usuario.findOne({Cedula:cedula})
      const mascota = await Mascotas.findOne({'Propietario':us._id}).populate('Propietario')
      console.log(mascota)
      console.log(req.query) 
      res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrar"),{usuario:mascota})}
      catch(err){
        res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:`algo salio mal intentelo mas tarde o contacte con su proveedor de esto: ${err}`,action:"/contacta"})
          
      }
  }
  else{
      try{
      const mascota = await Mascotas.find().populate('Propietario')
      res.render(join(__dirname,"..","..","Vistas","interfaz_veterinario","mostrar","mostrar"),{usuario:mascota})}
      catch(err){
        res.render(join(__dirname,"..","..","Vistas","Message","mensaje.mustache"),{mensaje:`algo salio mal intentelo mas tarde o contacte con su proveedor de esto: ${err}`,action:"/contacta"})
          
      }

  }}