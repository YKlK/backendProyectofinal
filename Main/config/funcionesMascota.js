import Mascotas from "../model/Mascotas.js"


export const registrarmascota=async(req,res)=>{
    const {
      Nombre,
      Propietario,
      Raza,
      Tipo,
      Peso,
      RecordVacunas,
      Enfermedades,
      Alergias}  =  req.body 
                    
    const perro = new Mascotas({
      Nombre,
      Propietario,
      Raza,
      Tipo,
      Peso,
      RecordVacunas,
      Enfermedades,
      Alergias
            // Roles:["Usuario"]
    })
    await perro.save()
    
    
  
    
  
    console.log(perro)
    res.status(200).json(perro)
  }
  //me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu
  
  export const getmascotaById = async (req, res) => {
  const { ID_mascotas } = req.params;
  
  const getmascotaid = await Mascotas.findById(ID_mascotas).populate();
  res.status(200).json(getmascotaid);
  };
  
  //me servira para imprimir en pantallla todas las veterinarias disponibles papu
  export const getmascota = async (req, res) => {
    const listadousers = await Mascotas.find().populate;
    return res.json(listadousers);
  };
  
  //me servira para actualizar la triple pta veterinaria (borrar al rato)
  export const actualizarmascota = async (req, res) => {
  const {
    Nombre,
      Propietario,
      Raza,
      Tipo,
      Peso,
      RecordVacunas,
      Enfermedades,
      Alergias}  =  req.body
  
  const updatedmascotin = await Mascotas.findByIdAndUpdate(
  req.params.mascotas,
  {
    Nombre,
    Propietario,
    Raza,
    Tipo,
    Peso,
    RecordVacunas,
    Enfermedades,
    Alergias
  },
  {
    new: true,
  }
  );
  res.status(200).json(updatedmascotin);
  };
  
  
  //borrar atraves del id alv
  export const deletemascotaById = async (req, res) => {
    const { mascotas } = req.params;
  
    await Mascotas.findByIdAndDelete(mascotas);
  
    res.status(200).json();
  };