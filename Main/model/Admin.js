import mongoose from "mongoose";

import bcryptjs from "bcryptjs"

const AdminSchema = mongoose.Schema({

   Gmail:String,
   Password:String,
   
},{
   versionKey : false
})

AdminSchema.static("encryptPassword",  async (Contrasena) => {
    

   const salt = await bcryptjs.genSalt(10)
   const hash = bcryptjs.hash(Contrasena,salt)
   return hash
} )


AdminSchema.static("matchPassword", async function matchPassword(Contrasena,ContrasenaRecivida){
   return await bcryptjs.compare(Contrasena,ContrasenaRecivida) ;
});


export default mongoose.model("Admin",AdminSchema)

//con pila de fe no bulto