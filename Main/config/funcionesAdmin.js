import Admin from "../model/Admin.js"
import usuario from "../model/usuario.js"
import Veterinarias from "../model/Veterinarias.js"
import jwt from "jsonwebtoken";
export const singinAdmin = async(req,res)=>{
  if(req.cookies.tokenAdmin) res.clearCookie("tokenAdmin")
  if(req.cookies.tokenVeterinaria) res.clearCookie("tokenVeterinaria")
  if(req.cookies.tokenUser) res.clearCookie("tokenUser")
  const theONE = await Admin.findOne({Gmail : req.body.Gmail})
  const theONEU =await usuario.findOne({CorreoElectronico : req.body.Gmail})
  const theONEV =await Veterinarias.findOne({GmailEmperesarial : req.body.Gmail})
  if (!theONE) return res.status(404).json({message:"noooo"})

  const matchPassword =theONE.Password==req.body.Password

  if (!matchPassword) return res.status(401).json({token: null,message:"contraseña invalida como en los teleton xdxdxdd"})
  const tokenA = jwt.sign({id:theONE._id},process.env.secretadmin,{expiresIn:"1d"})
  const tokenU = jwt.sign({id:theONEU._id},process.env.secretuser,{expiresIn:"1d"})
  const tokenV = jwt.sign({id:theONEV._id},process.env.secretveterinarian,{expiresIn:"1d"})
  
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

