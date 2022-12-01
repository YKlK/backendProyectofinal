import Mascotas from "../model/Mascotas.js"


export const registrarmascota=async(req,res)=>{
  try{  
  const {
      Nombre,
    Propietario,
    Raza,
    Tipo,
    Peso,
    Enfermedades} =  req.body 
                    
    const perro = new Mascotas({
      Nombre,
      Propietario,
      Raza,
      Tipo,
      Peso,
      Enfermedades,

           
    })
    await perro.save()
    
    res.status(200).json(perro)
  }
  catch(err){
    res.status(401).send(err)
  }
}
  //me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu
  
  export const getmascotaById = async (req, res) => {
    try{
  const { ID_mascotas } = req.params;
  
  const getmascotaid = await Mascotas.findById(ID_mascotas).populate();
  res.status(200).json(getmascotaid);}
  catch(err){
    res.status(401).send(err)
  }
  };
  
  //me servira para imprimir en pantallla todas las veterinarias disponibles papu
  export const getmascota = async (req, res) => {
    try{
    const listadousers = await Mascotas.find().populate;
    return res.json(listadousers);
    }
    catch(err){
      res.status(401).send(err)
    }
  };
  
  //me servira para actualizar la triple pta veterinaria (borrar al rato)
  export const actualizarmascota = async (req, res) => {
  try{
    const {
    Nombre,
    Propietario,
    Raza,
    Tipo,
    Peso,
    Enfermedades}  =  req.body
  
  const updatedmascotin = await Mascotas.findByIdAndUpdate(
  req.params.mascotas,
  {
    Nombre,
    Propietario,
    Raza,
    Tipo,
    Peso,
    Enfermedades
  },
  {
    new: true,
  }
  );
  res.status(200).json(updatedmascotin);
  }
  catch(err){
    res.status(401).send(err)
  }
};
  
  
  //borrar atraves del id alv
  export const deletemascotaById = async (req, res) => {
    try{const { mascotas } = req.params;
  
    await Mascotas.findByIdAndDelete(mascotas);
  
    res.status(200).json();}
    catch(err){
      res.status(401).send(err)
    }
  };