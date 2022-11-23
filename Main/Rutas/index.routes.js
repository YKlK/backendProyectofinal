import { Router } from "express"
const route = Router();
route.get("/",(req,res)=>{
    res.render(require("path").join(__dirname,"..","..","vistas","index.mustache"))
}) 
export default route