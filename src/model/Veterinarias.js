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
const mongoose_1 = require("mongoose");
const encriptadorveterinaria = require("bcryptjs");
const mongooseVeterinaria = require("mongoose");
require("./../Rutas/afiliado");
const VeterinariasSchema = mongooseVeterinaria.Schema({
    NombreSucursal: String,
    Ubicacion: String,
    GmailEmperesarial: String,
    Contraseña: String,
    Roles: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Role" }]
}, {
    versionKey: false
});
VeterinariasSchema.static("encryptPassword", (Contrasena) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield encriptadorveterinaria.genSalt(10);
    const hash = encriptadorveterinaria.hash(Contrasena, salt);
    return hash;
}));
VeterinariasSchema.static("matchPassword", function (Contrasena, ContrasenaRecivida) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield encriptadorveterinaria.compare(Contrasena, ContrasenaRecivida);
    });
});
module.exports = mongooseVeterinaria.model("Veterinarias", VeterinariasSchema);
