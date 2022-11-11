"use strict";
const express = require("express");
const env = require("node-env-file");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const initial = require(path.join(__dirname, "config", "initial"));
const Puerto = process.env.PORT || 3000;
const mustache = require("mustache-express");
const methodOverWrite = require("method-override");
const seccion = require("express-session");
// const passport = require("passport") 
const flash = require("connect-flash");
const morgan = require("morgan");
const app = express();
//constantes y declaraciones ^^^^^^^ ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
console.log(require("path").join(__dirname, "model", "Veterinarias"));
env(path.join(__dirname, "config", ".env"));
//variables de entorno ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
require(path.join(__dirname, "config", "model"));
//inicio de base de datos^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
initial.createRoles();
initial.createAdmin();
app.engine(".mustache", mustache());
app.set("view engine", 'mustache');
app.set('views', path.join(__dirname, "..", "Vistas"));
//estableciendo el motor de plantillas mustache
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "..", "Vistas", "interfaz_veterinario")));
app.use(express.static(path.join(__dirname, "..", "Vistas")));
app.use(express.static(path.join(__dirname, "..", "Vistas", "Login_Veterinaria_User")));
app.use(express.static(path.join(__dirname, "..", "Vistas", "Admin")));
app.use(bodyParser.json());
app.use(methodOverWrite("_method"));
// app.use(seccion({ 
//     secret: process.env.secret,
//     resave:true, 
//     saveUninitialized: true
// }))
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash())
app.use(require("./Rutas/AdminR"));
app.use(require("./Rutas/index"));
app.use(require("./Rutas/usuario"));
app.use(require("./Rutas/afiliado"));
//Rutas^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
app.listen(Puerto, () => {
    console.log(Puerto);
});
//41
