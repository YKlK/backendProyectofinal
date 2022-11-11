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
exports.checkExistingRole = exports.checkExistingVeterinarian = exports.checkExistingUser = void 0;
const Userverify = require("./../model/usuario");
const Veterinarianverify = require("./../model/Veterinarias");
const rolesverify = require("./../model/rule");
const checkExistingUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userFound = yield Userverify.findOne({ Nombre: req.body.Nombre });
        if (userFound)
            return res.status(400).json({ message: "The user already exists" });
        const email = yield Userverify.findOne({ CorreoElectronico: req.body.CorreoElectronico });
        if (email)
            return res.status(400).json({ message: "The email already exists" });
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.checkExistingUser = checkExistingUser;
const checkExistingVeterinarian = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("hola");
    try {
        const veterinarianFound = yield Veterinarianverify.findOne({ NombreSucursal: req.body.NombreSucursal });
        if (veterinarianFound)
            return res.status(400).json({ message: "The user already exists" });
        const email = yield Veterinarianverify.findOne({ GmailEmperesarial: req.body.GmailEmperesarial });
        if (email)
            return res.status(400).json({ message: "The email already exists" });
        next();
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});
exports.checkExistingVeterinarian = checkExistingVeterinarian;
const checkExistingRole = (req, res, next) => {
    // req.body.Roles.find();
    if (!req.body.Roles)
        return res.status(400).json({ message: "No roles" });
    for (let i = 0; i < req.body.Roles.length; i++) {
        if (!rolesverify.includes(req.body.Roles[i])) {
            return res.status(400).json({
                message: `Role ${req.body.Roles[i]} does not exist`,
            });
        }
    }
    next();
};
exports.checkExistingRole = checkExistingRole;
