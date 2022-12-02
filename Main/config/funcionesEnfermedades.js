import Revicion from "../model/Revicion.js"


export const agregarenfermedad=async(req,res)=>{
    try{
    const {
        RecordVacunas,
        revicion,
        Alergias,
        cirugias}  =  req.body 
                    
    const desgracias = new Revicion({
        RecordVacunas,
        revicion,
        Alergias,
        cirugias
           
    })
    await desgracias.save()
    
    res.status(200).json(desgracias)}
    catch(err){
      console.log(err)
        res.status(401).send(err)
    }
  }
  //me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu
  
  // export const getenfermedadById = async (req, res) => {
  //   try{
  // const { ID_revicion } = req.params;
  
  // const getdesgraciaid = await revicion.findById(ID_revicion);
  // res.status(200).json(getdesgraciaid);}
  // catch(err){
  //   res.status(401).send(err)
  // }
  // };
  
  // //me servira para imprimir en pantallla todas las veterinarias disponibles papu
  // export const getenfermedad = async (req, res) => {
  //   try{
  //   const listadorevicion = await revicion.find();
  //   return res.json(listadorevicion);
  // }catch(err){
  //   res.status(401).send(err)
  // }};
  
  // //me servira para actualizar la triple pta veterinaria (borrar al rato)
  // export const actualizarmascota = async (req, res) => {
  // try{
  //   const {
  //   RecordVacunas,
  //   revicion,
  //   Alergias,
  //   cirugias}  =  req.body
  
  // const updateEnfermedadParaPEORXDDD = await revicion.findByIdAndUpdate(
  // req.params.revicion,
  // {
  //   RecordVacunas,
  //   revicion,
  //   Alergias,
  //   cirugias
  // },
  // {
  //   new: true,
  // }
  // );
  // res.status(200).json(updateEnfermedadParaPEORXDDD);
  // }catch(err){
  //   res.status(401).send(err)
  // }};
  
  
  // //borrar atraves del id alv
  // export const deletemascotaById = async (req, res) => {
  //   try{const { revicion } = req.params;
  
  //   await revicion.findByIdAndDelete(revicion);
  
  //   res.status(200).json();
  // }
  // catch(err){
  //   res.status(401).send(err)
  // }};