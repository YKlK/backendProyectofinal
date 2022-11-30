import mongoose from "mongoose";

const AdminSchema = mongoose.Schema({

   Gmail:String,
   Password:String,
   
},{
   versionKey : false
})

export default mongoose.model("Admin",AdminSchema)

//con pila de fe no bulto