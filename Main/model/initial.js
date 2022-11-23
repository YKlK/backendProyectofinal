
import Admin from "./Admin.js"
import usuario from "./usuario.js"
import Veterinarias from "./Veterinarias.js"

export const singinAdmin = async(req,res)=>{
  const theONE = await Admin.findOne({Gmail : req.body.Gmail})
  const theONEU =await usuario.findOne({CorreoElectronico : req.body.Gmail})
  const theONEV =await Veterinarias.findOne({GmailEmperesarial : req.body.Gmail})
  if (!theONE) return res.status(404).json({message:"noooo"})

  const matchPassword = Admin.matchPassword(theONE.Password,req.body.Password)

  if (!matchPassword) return res.status(401).json({token: null,message:"contraseña invalida como en los teleton xdxdxdd"})
  const tokenA = jwt.sign({id:theONE._id},process.env.secretadmin,{expiresIn:"1d"})
  const tokenU = jwt.sign({id:theONEU._id},process.env.secretuser,{expiresIn:"1d"})
  const tokenV = jwt.sign({id:theONEV._id},process.env.secretveterinarian,{expiresIn:"1d"})
  if(req.cookies.tokenAdmin) res.clearCookie("tokenAdmin")
  if(req.cookies.tokenVeterinaria) res.clearCookie("tokenVeterinaria")
  if(req.cookies.tokenUser) res.clearCookie("tokenUser")
  res.cookie("tokenVeterinaria",tokenV,{
    sameSite:"strict",
    maxAge:86400000,
    httpOnly:true
  })
  res.cookie("tokenUser",tokenU,{
    sameSite:"strict",
    maxAge:86400000,
    httpOnly:true
  })
  res.cookie("tokenAdmin",tokenA,{
    sameSite:"strict",
    maxAge:86400000,
    httpOnly:true
  })

  res.redirect("/nose")
}


export const createAdmin = async() => {
    const admin = await Admin.estimatedDocumentCount()
    const user = await usuario.estimatedDocumentCount()
    const veteri = await Veterinarias.estimatedDocumentCount()

    if(user>0 && admin>0 && veteri>0) {
        await Admin.findOne({Gmail:"3JPI@gmail.com"})

        await usuario.findOne({Gmail:"3JPI@gmail.com"})

        await Veterinarias.findOne({Gmail:"3JPI@gmail.com"})

        return};
    
    new Admin({Gmail:"3JPI@gmail.com", Password: await Admin.encryptPassword(process.env.AdminPassword)}).save()
    new Veterinarias({  NombreSucursal: "3JPI",Ubicacion :"en efecto",GmailEmperesarial:"3JPI@gmail.com", Contraseña: await Veterinarias.encryptPassword(process.env.AdminPassword)}).save()
    
      


   new usuario({Nombre: "3JPI",
        Edad: 3,
        Direccion : "3JPI",
        telefono: 3791,
        Cedula: "3JPI",CorreoElectronico:"3JPI@gmail.com", Contrasena: await initadmin.encryptPassword(process.env.AdminPassword)}).save()


    

     
} 
