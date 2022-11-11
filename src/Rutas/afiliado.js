"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routerAfiliado = require("express").Router();
// const regexafiliados = require(require("path").join(__dirname,"..","config","ReGex.js"))
const funcionesAdmin_1 = require("./../config/funcionesAdmin");
// require("path").join(__dirname,"..","..","vistas","index.mustache")
// console.log(regexafiliados.Email)
routerAfiliado.get("/signInVeterinarian", (req, res) => {
    console.log(funcionesAdmin_1.singinveterinaria);
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "Login_Veterinaria_User", "index"), {
        title: "signInVeterinarian",
        path: "/signInVeterinarian",
        Gmail: "GmailEmperesarial",
        Password: "Contraseña"
    });
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzNmRjYWY5ZTVkODAzNmI4YzcwMmIzZiIsImlhdCI6MTY2ODEzOTc2OX0.R6VyS7J6_qZ8t6dLko-lrektuHIUBzLE-I94XUf9mz8
routerAfiliado.get("/eliminar", (req, res) => {
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "interfaz_veterinario", "eliminar", "eliminar"));
});
routerAfiliado.get("/editar", (req, res) => {
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "interfaz_veterinario", "editar", "editar"));
});
routerAfiliado.get("/agregar", (req, res) => {
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "interfaz_veterinario", "agregar", "agregar"));
});
routerAfiliado.get("/mostrar", (req, res) => {
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "interfaz_veterinario", "mostrar", "mostrar"));
});
routerAfiliado.get("/interfaz", (req, res) => {
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "interfaz_veterinario", "interfaz"), {
        agregar: "/agregar",
        editar: "/editar",
        eliminar: "/eliminar",
        mostrar: "/mostrar"
    });
});
routerAfiliado.post("/signInVeterinarian", (req, res) => {
    (0, funcionesAdmin_1.singinveterinaria)(req, res);
});
module.exports = routerAfiliado;
