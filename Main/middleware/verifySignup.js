import usuario from "../model/usuario.js";
import Veterinarias from "../model/Veterinarias.js";

export const checkExistingUser = async (req, res, next) => {
    try {
      const userFound = await usuario.findOne({ username: req.body.username });
      if (userFound)
        return res.status(400).json({ message: "The user already exists" });
  
      const email = await usuario.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "The email already exists" });
  
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
        return res.status(400).json({ message: "The user already exists" });
  
      const email = await Veterinarias.findOne({ email: req.body.email });
      if (email)
        return res.status(400).json({ message: "The email already exists" });
  
      next();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
  //=============================================================================================================================

