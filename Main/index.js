
import express from "express";
import * as dotenv from 'dotenv'
import bodyParser from "body-parser"

import path from "node:path";
import { createAdmin } from "./model/initial.js";
const Puerto = process.env.PORT || 3000;
import mustacheExpress from "mustache-express";
import cookieParser from "cookie-parser";

import methodOverride from "method-override";
// const passport = require("passport") 

import morgan from "morgan";
const app = express();

//constantes y declaraciones ^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
// console.log(require("path").join(__dirname,"model","Veterinarias")) 
dotenv.config({ path: '.env', encoding: 'latin1', debug: true, override: false })

//variables de entorno ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

//inicio de base de datos^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


createAdmin();
 







app.engine(".mustache",mustacheExpress())
app.set("view engine", 'mustache')
app.set('views', "./../Vistas" );  
//estableciendo el motor de plantillas mustache

app.use(morgan("dev"))
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("./../Vistas/interfaz_veterinario"))
app.use(express.static("./../Vistas"));
app.use(express.static("./../Vistas/Login_Veterinaria_User"));
app.use(express.static("./../Vistas/Admin"));
app.use(bodyParser.json());
app.use(cookieParser())
app.use(methodOverride("_method"));
// app.use(seccion({ 
//     secret: process.env.secret,
//     resave:true, 
//     saveUninitialized: true
// }))
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash())


import routerAdmin from "./Rutas/AdminR.routes.js";
import routerAfiliado from "./Rutas/afiliado.routes.js";
import route from "./Rutas/index.routes.js";
import router from "./Rutas/usuario.routes.js";

app.use(routerAdmin)
app.use(routerAfiliado)
app.use(route)
app.use(router)
//Rutas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

app.listen(Puerto,()=>{
    console.log(Puerto)
})


//41