import usuario from "../model/usuario.js";
import Veterinarias from "../model/Veterinarias.js";
import Admin from "../model/Admin.js";
import jwt from "jsonwebtoken";
export const verifyTokenAdmin = async (req, res, next) => {
  let token = req.cookies.tokenAdmin;
  // console.log(req.cookies.token)
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.secretadmin);
    
    const admin = await Admin.findById(decoded.id);
    if (!admin) return res.status(404).json({ message: "No admin found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};
//================================================================================================================================================
export const verifyTokenVeterinarian = async (req, res, next) => {
  let token = req.cookies.tokenVeterinaria;
  // console.log(req.cookies.token)
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.secretveterinarian);
    
    const admin = await Veterinarias.findById(decoded.id);
    if (!admin) return res.status(404).json({ message: "No veterinarian found" });

    next();
  } catch (error) {

    return res.status(401).json({ message: "Unauthorized!" });
  }
};
//================================================================================================================================================
export const verifyTokenUser = async (req, res, next) => {
  let token = req.cookies.tokenUser;
  // console.log(req.cookies.token)
  if (!token) return res.status(403).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.secretuser);
    
    const admin = await usuario.findById(decoded.id);
    if (!admin) return res.status(404).json({ message: "No user found" });

    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized!" });
  }
};

