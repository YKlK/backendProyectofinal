import mongoose from "mongoose"
export const database = async()=>{
    let intento = true
    while(intento){
    await mongoose.connect(process.env.DBconnect,{useNewUrlParser : true, useUnifiedTopology : true})
    .then((db)=>{console.log(`${db} is conected in ${process.env.DBconnect}`)
    intento = false;
    })
    .catch((err)=>{console.log(`${err.message}`)
    })
}
}

    //every bien aqui
