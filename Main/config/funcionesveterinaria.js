import Veterinarias from "../model/Veterinarias.js"
import jwt from "jsonwebtoken";

export const singinveterinaria = async (req,res) => {
    const veterinariaFound = await Veterinarias.findOne({GmailEmperesarial:req.body.GmailEmperesarial})
    if (!veterinariaFound) return res.status(404).json({message:"noooo"})
    
    const matchPassword = Veterinarias.matchPassword(veterinariaFound.Contraseña,req.body.Contraseña)
  
    if (!matchPassword) return res.status(401).json({token: null,message:"contraseña invalida como en los teleton xdxdxdd"})
    
    const token = jwt.sign({id:veterinariaFound._id},process.env.secretveterinarian,{expiresIn:"1d"})
    if(req.cookies.tokenAdmin) res.clearCookie("tokenAdmin")
    if(req.cookies.tokenVeterinaria) res.clearCookie("tokenVeterinaria")
    if(req.cookies.tokenUser) res.clearCookie("tokenUser")
    res.cookie("tokenVeterinaria",token,{
      sameSite:"strict",
      maxAge:86400000,
      httpOnly:true
    })
  
    res.redirect("/interfazV")
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
        Contraseña:await Veterinarias.encryptPassword(Contraseña),
        Role:"Veterinaria"
      })
            
     
      
  
      const token = await veteri.save() 
  
      const JWT = jwt.sign({veteri_id:token._id},process.env.secret)
  
      res.status(200).json(JWT)
    }
    catch(err){
      console.log(err)
    }
  }
  //       try {
  //         const { NombreSucursal,
  //                     Ubicacion ,
  //                     GmailEmperesarial,
  //                     Contraseña ,
  //                     roles } = req.body;
      
  //         const rolesFound = await Admin_role.find({ name: roles });
      
  //         // creating a new User
  //         const user = new Veterinarias({
  //           NombreSucursal,
  //                 Ubicacion,
  //                 GmailEmperesarial,
  //                 Contraseña:await Veterinarias.encryptPassword(Contraseña),
  //           Roles: rolesFound.map((role:any) => role._id)
  //         });
      
  //         // encrypting password
          
      
  //         // saving the new user
  //         const savedUser = await user.save();
      
  //         return res.status(200).json({
  //           _id: savedUser._id,
  //           username: savedUser.username,
  //           email: savedUser.email,
  //           roles: savedUser.roles,
  //         });
  //       } catch (error) {
  //         console.error(error);
  //       }
  
  
  
  
  
  //me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu
  export const getVeterinariaById = async (req, res) => {
      const { ID_veterinaria } = req.params;
    
      const getveterinariaid = await Veterinarias.findById(ID_veterinaria);
      res.status(200).json(getveterinariaid);
    }; 
  //me servira para imprimir en pantallla todas las veterinarias disponibles papu
    export const getVeterinarias = async (req, res) => {
  
          const listadoVeterinarias = await Veterinarias.find();
          return res.json(listadoVeterinarias);
        };
  //me servira para actualizar la triple pta veterinaria (borrar al rato)
  export const actualizarVeterinaria = async (req, res) => {
    const {
      NombreSucursal,
      Ubicacion ,
      GmailEmperesarial,
      Contraseña ,
      Role}=  req.body 
  
      const updatedProduct = await Veterinarias.findByIdAndUpdate(
        req.params.veterinaria,
       {
        NombreSucursal,
      Ubicacion ,
      GmailEmperesarial,
      Contraseña:await Veterinarias.encryptPassword(Contraseña) ,
      Role
       },
        {
          new: true,
        }
      );
      res.status(200).json(updatedProduct);
    };
  //borrar atraves del id alv
    export const deleteVeterinariaById = async (req, res) => {
          const { veterinaria } = req.params;
        
          await Veterinarias.findByIdAndDelete(veterinaria);
        
          
          res.status(200).json();
        };
  
  