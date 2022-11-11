"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const routerUsuario = require("express").Router();
const funcionesAdmin_1 = require("./../config/funcionesAdmin");
const index_1 = require("./../middleware/index");
routerUsuario.get("/signInUser", index_1.verifySignup.checkExistingUser, (req, res) => {
    res.render(require("path").join(__dirname, "..", "..", "Vistas", "Login_Veterinaria_User", "index"), {
        title: "signInUser",
        path: "/signInUser",
        Gmail: "CorreoElectronico",
        Password: "Contrasena"
    });
});
routerUsuario.post("/signInUser", (req, res) => {
    (0, funcionesAdmin_1.singinUser)(req, res);
});
module.exports = routerUsuario;
