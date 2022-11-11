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
const mongooseAdmin = require("mongoose");
const encriptadorAdmin = require("bcryptjs");
const mongoose_1 = require("mongoose");
const AdminSchema = mongooseAdmin.Schema({
    Gmail: String,
    Password: String,
    Roles: [{ ref: "Role", type: mongoose_1.Schema.Types.ObjectId }]
}, {
    versionKey: false
});
AdminSchema.static("encryptPassword", (Contrasena) => __awaiter(void 0, void 0, void 0, function* () {
    const salt = yield encriptadorAdmin.genSalt(10);
    const hash = encriptadorAdmin.hash(Contrasena, salt);
    return hash;
}));
AdminSchema.static("matchPassword", function matchPassword(Contrasena, ContrasenaRecivida) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield encriptadorAdmin.compare(Contrasena, ContrasenaRecivida);
    });
});
module.exports = mongooseAdmin.model("Admin", AdminSchema);
//con pila de fe no bulto
