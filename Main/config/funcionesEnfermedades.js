import enfermedades from "../model/enfermedades.js"


export const agregarenfermedad=async(req,res)=>{
    try{
    const {
        RecordVacunas,
        Enfermedades,
        Alergias,
        cirugias}  =  req.body 
                    
    const desgracias = new enfermedades({
        RecordVacunas,
        Enfermedades,
        Alergias,
        cirugias
           
    })
    await desgracias.save()
    
    res.status(200).json(perro)}
    catch(err){
        res.status(401).send(err)
    }
  }
  //me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu
  
  export const getenfermedadById = async (req, res) => {
    try{
  const { ID_enfermedades } = req.params;
  
  const getdesgraciaid = await enfermedades.findById(ID_enfermedades);
  res.status(200).json(getdesgraciaid);}
  catch(err){
    res.status(401).send(err)
  }
  };
  
  //me servira para imprimir en pantallla todas las veterinarias disponibles papu
  export const getenfermedad = async (req, res) => {
    try{
    const listadoenfermedades = await enfermedades.find();
    return res.json(listadoenfermedades);
  }catch(err){
    res.status(401).send(err)
  }};
  
  //me servira para actualizar la triple pta veterinaria (borrar al rato)
  export const actualizarmascota = async (req, res) => {
  try{
    const {
    RecordVacunas,
    Enfermedades,
    Alergias,
    cirugias}  =  req.body
  
  const updateEnfermedadParaPEORXDDD = await enfermedades.findByIdAndUpdate(
  req.params.enfermedades,
  {
    RecordVacunas,
    Enfermedades,
    Alergias,
    cirugias
  },
  {
    new: true,
  }
  );
  res.status(200).json(updateEnfermedadParaPEORXDDD);
  }catch(err){
    res.status(401).send(err)
  }};
  
  
  //borrar atraves del id alv
  export const deletemascotaById = async (req, res) => {
    try{const { enfermedades } = req.params;
  
    await enfermedades.findByIdAndDelete(enfermedades);
  
    res.status(200).json();
  }
  catch(err){
    res.status(401).send(err)
  }};