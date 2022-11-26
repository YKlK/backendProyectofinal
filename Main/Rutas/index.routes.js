import { Router } from "express"
import {dirname,join} from "node:path"
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const route = Router();
// console.log(join(__dirname,"..","..","Vistas","landing","index.mustache"))
route.get("/",(req,res)=>{
    res.render(join(__dirname,"..","..","Vistas","landing","index.mustache"))
}) 
export default route