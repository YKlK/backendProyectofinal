"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongooseUsuario = require("mongoose");
const encriptadorUsuario = require("bcryptjs");
const mongoose_1 = require("mongoose");
const UsuarioSchema = mongooseUsuario.Schema({
    Nombre: String,
    Edad: Number,
    Direccion: String,
    telefono: Number,
    Cedula: String,
    CorreoElectronico: String,
    Contrasena: String,
    Roles: { type: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Role" }] }
}, {
    versionKey: false
});
UsuarioSchema.static("encryptPassword", (Contrasena) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield encriptadorUsuario.genSalt(10);
    const hash = encriptadorUsuario.hash(Contrasena, salt);
    return hash;
}));
UsuarioSchema.static("matchPassword", function (Contrasena, ContrasenaRecivida) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield encriptadorUsuario.compare(Contrasena, ContrasenaRecivida);
    });
});
module.exports = mongooseUsuario.model("Usuarios", UsuarioSchema);
