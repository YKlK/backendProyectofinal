import Usuarios from "../model/usuario.js"
import jwt from "jsonwebtoken";
 
  export const singinUser = async (req,res)=>{
    const userFound = await Usuarios.findOne({CorreoElectronico:req.body.CorreoElectronico});
  
    if (!userFound) return res.status(404).json({message:"noooo"})
    
    const matchPassword =userFound.Contrasena==req.body.Contrasena
  
    if (!matchPassword) return res.status(401).json({token: null,message:"contraseña invalida como en los teleton xdxdxdd"})
    
    const token = jwt.sign({id:userFound._id},process.env.secretuser,{expiresIn:"1d"})
    if(req.cookies.tokenAdmin) res.clearCookie("tokenAdmin")
    if(req.cookies.tokenVeterinaria) res.clearCookie("tokenVeterinaria")
    if(req.cookies.tokenUser) res.clearCookie("tokenUser")
    res.cookie("tokenUser",token,{
      sameSite:"strict",
      maxAge:86400000,
      httpOnly:true
    })
  
    res.redirect("/interfaz_usuario")
  }

  export const registrarUsuario=async(req,res)=>{
    try{
      const {
              Nombre,
              Edad,
              Direccion ,
              telefono,
              Cedula,
              CorreoElectronico,
              Contrasena,
              }  =  req.body 
                      
      const user = new Usuarios({
              Nombre,
              Edad,
              Direccion ,
              telefono,
              Cedula,
              CorreoElectronico,
              Contrasena,
      })
      const token = await user.save() 
      const JWT = jwt.sign({id:token._id},process.env.secret)
      
      res.status(200).json(JWT)}
    catch(err){
      res.status(401).json();
    }
}
//me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu

export const getusuarioById = async (req, res) => {
  try{
    const { ID_User } = req.params;
    const getuserid = await Usuarios.findById(ID_User);
    res.status(200).json(getuserid);
  }catch(err){
    res.status(401).json();
  }
};

//me servira para imprimir en pantallla todas las veterinarias disponibles papu
export const getusuarios = async (req, res) => {
  try{
    const listadousers = await Usuarios.find();
    return res.json(listadousers);
  }
  catch(err){
  res.status(401).json();
  }};

//me servira para actualizar la triple pta veterinaria (borrar al rato)
export const actualizarusuarios = async (req, res) => {
  try{
  const {
    Nombre,
    Edad,
    Direccion ,
    telefono,
    Cedula,
    CorreoElectronico,
    Contrasena,}  =  req.body

const updatedUSer = await Usuarios.findByIdAndUpdate(
  req.params.User,
 {
  Nombre,
  Edad,
  Direccion ,
  telefono,
  Cedula,
  CorreoElectronico,
  Contrasena,
 },
  {
    new: true,
  }
);
res.status(200).json(updatedUSer);}
catch(err){
  res.status(401).json();
}};


//borrar atraves del id alv
export const deleteusuarioById = async (req, res) => {
  try{
    const { user } = req.params;
  
    await Usuarios.findByIdAndDelete(user);
  
    res.status(200).json();
  }catch(err){
    res.status(401).json();
  }};