import usuario from "../model/usuario.js";
import Veterinarias from "../model/Veterinarias.js";

export const checkExistingUser = async (req, res, next) => {
    try {
      const userFound = await usuario.findOne({ username: req.body.username });
      if (userFound)
        return res.status(400).json({ message: "Este Usuario ya existe" });
  
      const email = await usuario.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "El Gmail ya existe" });
  
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //=============================================================================================================================

export const checkExistingVeterinarian = async (req, res, next) => {
    try {
      const userFound = await Veterinarias.findOne({ username: req.body.username });
      if (userFound)
        return res.status(400).json({ message: "Esta Sucursal ya existe" });
  
      const email = await Veterinarias.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "El Gmail Empresarial ya existe" });
  
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //=============================================================================================================================

