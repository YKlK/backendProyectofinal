import express from "express";
import * as dotenv from 'dotenv'
import bodyParser from "body-parser"
import { createAdmin } from "./model/initial.js";
const Puerto = process.env.PORT || 3000;
import mustacheExpress from "mustache-express";
import cookieParser from "cookie-parser";
import methodOverride from "method-override";
import {database} from "./config/model.js"
import morgan from "morgan";
import routerAdmin from "./Rutas/AdminR.routes.js";
import routerAfiliado from "./Rutas/afiliado.routes.js";
import route from "./Rutas/index.routes.js";
import router from "./Rutas/usuario.routes.js";
const app = express();
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io'; //replaces (import socketIo from 'socket.io')
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: '*' } });
import { dirname , join} from 'node:path';
import { fileURLToPath } from 'url';
const __filename = new URL('', import.meta.url).pathname;
const __dirname = dirname(fileURLToPath(import.meta.url));
import IOSOCKET from "./config/socket.js"

//constantes y declaraciones ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


dotenv.config({ path: '.env', encoding: 'latin1', debug: true, override: false })


//variables de entorno ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const iniciodebase=async ()=>{
await database()
await createAdmin()
}
iniciodebase()
//inicio de base de datos^^^^^^^^^^^^^^^^^^^^^^^^^^^^^




IOSOCKET(io)

//funciones socket.io


app.engine(".mustache",mustacheExpress())
app.set("view engine", 'mustache')
app.set('views', join(__dirname,"..","Vistas"));  
//estableciendo el motor de plantillas mustache


app.use(morgan("dev"))
// desarrollo herramienta
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
// para recibir el req.body del formulario papu
app.use(express.static(join(__dirname,"..","Vistas")));
app.use(express.static(join(__dirname,"..","Vistas","img")));
app.use(express.static(join(__dirname,"..","Vistas","landing")));
app.use(express.static(join(__dirname,"..","Vistas","interfaz_veterinario")))
app.use(express.static(join(__dirname,"..","Vistas","Login_Veterinaria_User")));
app.use(express.static(join(__dirname,"..","Vistas","Admin")));
app.use(express.static(join(__dirname,"..","Vistas","interfaz_usuario")))
app.use(express.static(join(__dirname,"..","Vistas","interfaz_usuario","ubicacion")))
app.use(express.static(join(__dirname,"..","Vistas","interfaz_usuario","GPSMASCOTA")))
app.use(express.static(join(__dirname,"..","Vistas","interfaz_usuario","perfil")))
app.use(express.static(join(__dirname,"..","Vistas","404")))
// app.use(express.static(join(__dirname,"..","Vistas","interfaz_usuario","inicio")))
// enviando los archivos al navedador


app.use(cookieParser())
app.use(methodOverride("_method"));
// cookies y sobreescritura de metodos

app.use(route)
app.use(routerAdmin)
app.use(routerAfiliado)
app.use(router)
app.use(function(req, res){
    res.status(404).render("./../Vistas/404/404.mustache", { title: "No encontrado" });
});
//Rutas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

httpServer.listen(Puerto,()=>{
    console.log(Puerto)
})


//41