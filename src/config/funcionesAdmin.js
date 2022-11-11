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
exports.singinUser = exports.deleteusuarioById = exports.actualizarusuarios = exports.getusuarios = exports.getusuarioById = exports.registrarUsuario = exports.deleteVeterinariaById = exports.actualizarVeterinaria = exports.getVeterinarias = exports.getVeterinariaById = exports.registrarveterinaria = exports.singinveterinaria = exports.singinAdmin = void 0;
const Admin_Veterinaria = require("./../model/Veterinarias");
const Admin_User = require("./../model/usuario");
const Admin_Admin = require("./../model/Admin");
const Admin_role = require("./../model/rule");
const jwt = require("jsonwebtoken");
const singinAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const theONE = yield Admin_Admin.findOne({ Gmail: req.body.Gmail });
    if (!theONE)
        return res.status(404).json({ message: "noooo" });
    const matchPassword = Admin_Admin.matchPassword(theONE.Password, req.body.Password);
    if (!matchPassword)
        return res.status(401).json({ token: null, message: "contraseña invalida como en los teleton xdxdxdd" });
    const token = jwt.sign({ id: theONE._id }, process.env.secretveterinarian);
    req.setHeader("x-access-token", token);
    res.redirect("/nose");
});
exports.singinAdmin = singinAdmin;
const singinveterinaria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const veterinariaFound = yield Admin_Veterinaria.findOne({ GmailEmperesarial: req.body.GmailEmperesarial }).populate("Roles");
    if (!veterinariaFound)
        return res.status(404).json({ message: "noooo" });
    const matchPassword = Admin_Veterinaria.matchPassword(veterinariaFound.Contraseña, req.body.Contraseña);
    if (!matchPassword)
        return res.status(401).json({ token: null, message: "contraseña invalida como en los teleton xdxdxdd" });
    console.log(veterinariaFound);
    const token = jwt.sign({ id: veterinariaFound._id }, process.env.secretveterinarian);
    res.redirect("/nose");
});
exports.singinveterinaria = singinveterinaria;
const registrarveterinaria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { NombreSucursal, Ubicacion, GmailEmperesarial, Contraseña, roles } = req.body;
    const veteri = new Admin_Veterinaria({
        NombreSucursal,
        Ubicacion,
        GmailEmperesarial,
        Contraseña: yield Admin_Veterinaria.encryptPassword(Contraseña),
        // Roles:["Veterinario"]
    });
    if (roles) {
        const found = yield Admin_role.find({ name: { $in: roles } });
        veteri.roles = found.map((role) => role._id);
    }
    else {
        const role = yield Admin_role.findOne({ name: "Veterinario" });
        veteri.roles = [role._id];
    }
    const token = yield veteri.save();
    const JWT = jwt.sign({ id: token._id }, process.env.secretveterinarian);
    res.status(200).json(JWT);
    //       try {
    //         const { NombreSucursal,
    //                     Ubicacion ,
    //                     GmailEmperesarial,
    //                     Contraseña ,
    //                     roles } = req.body;
    //         const rolesFound = await Admin_role.find({ name: roles });
    //         // creating a new User
    //         const user = new Admin_Veterinaria({
    //           NombreSucursal,
    //                 Ubicacion,
    //                 GmailEmperesarial,
    //                 Contraseña:await Admin_Veterinaria.encryptPassword(Contraseña),
    //           Roles: rolesFound.map((role:any) => role._id)
    //         });
    //         // encrypting password
    //         // saving the new user
    //         const savedUser = await user.save();
    //         return res.status(200).json({
    //           _id: savedUser._id,
    //           username: savedUser.username,
    //           email: savedUser.email,
    //           roles: savedUser.roles,
    //         });
    //       } catch (error) {
    //         console.error(error);
    //       }
});
exports.registrarveterinaria = registrarveterinaria;
//me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu
const getVeterinariaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID_veterinaria } = req.params;
    const getveterinariaid = yield Admin_Veterinaria.findById(ID_veterinaria);
    res.status(200).json(getveterinariaid);
});
exports.getVeterinariaById = getVeterinariaById;
//me servira para imprimir en pantallla todas las veterinarias disponibles papu
const getVeterinarias = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listadoVeterinarias = yield Admin_Veterinaria.find();
    return res.json(listadoVeterinarias);
});
exports.getVeterinarias = getVeterinarias;
//me servira para actualizar la triple pta veterinaria (borrar al rato)
const actualizarVeterinaria = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { NombreSucursal, Ubicacion, GmailEmperesarial, Contraseña, roles } = req.body;
    const updatedProduct = yield Admin_Veterinaria.findByIdAndUpdate(req.params.veterinaria, {
        NombreSucursal,
        Ubicacion,
        GmailEmperesarial,
        Contraseña: yield Admin_Veterinaria.encryptPassword(Contraseña),
        roles
    }, {
        new: true,
    });
    res.status(200).json(updatedProduct);
});
exports.actualizarVeterinaria = actualizarVeterinaria;
//borrar atraves del id alv
const deleteVeterinariaById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { veterinaria } = req.params;
    yield Admin_Veterinaria.findByIdAndDelete(veterinaria);
    res.status(200).json();
});
exports.deleteVeterinariaById = deleteVeterinariaById;
//registrarUsuario,getusuarioById,getusuarios,actualizarusuarios,deleteusuarioById
//=======================================================================================================================
const registrarUsuario = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Edad, Direccion, telefono, Cedula, CorreoElectronico, Contrasena, roles } = req.body;
    const user = new Admin_User({
        Nombre,
        Edad,
        Direccion,
        telefono,
        Cedula,
        CorreoElectronico,
        Contrasena: yield Admin_User.encryptPassword(Contrasena),
        // Roles:["Usuario"]
    });
    if (roles) {
        const found = yield Admin_role.find({ name: { $in: roles } });
        user.roles = found.map((role) => role._id);
    }
    else {
        const role = yield Admin_role.findOne({ name: "Usuario" });
        user.roles = [role._id];
    }
    const token = yield user.save();
    const JWT = jwt.sign({ id: token._id }, process.env.secretveterinarian);
    console.log(JWT);
    res.status(200).json(JWT);
});
exports.registrarUsuario = registrarUsuario;
//me servira para imprimir en pantallla una sola veterinaria que tenga ese id papu
const getusuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { ID_User } = req.params;
    const getuserid = yield Admin_User.findById(ID_User);
    res.status(200).json(getuserid);
});
exports.getusuarioById = getusuarioById;
//me servira para imprimir en pantallla todas las veterinarias disponibles papu
const getusuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const listadousers = yield Admin_User.find();
    return res.json(listadousers);
});
exports.getusuarios = getusuarios;
//me servira para actualizar la triple pta veterinaria (borrar al rato)
const actualizarusuarios = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { Nombre, Edad, Direccion, telefono, Cedula, CorreoElectronico, Contrasena, roles } = req.body;
    const updatedUSer = yield Admin_User.findByIdAndUpdate(req.params.User, {
        Nombre,
        Edad,
        Direccion,
        telefono,
        Cedula,
        CorreoElectronico,
        Contrasena: yield Admin_User.encryptPassword(Contrasena),
        roles
    }, {
        new: true,
    });
    res.status(200).json(updatedUSer);
});
exports.actualizarusuarios = actualizarusuarios;
//borrar atraves del id alv
const deleteusuarioById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { user } = req.params;
    yield Admin_User.findByIdAndDelete(user);
    res.status(200).json();
});
exports.deleteusuarioById = deleteusuarioById;
const singinUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userFound = yield Admin_User.findOne({ CorreoElectronico: req.body.CorreoElectronico }).populate("Roles");
    if (!userFound)
        return res.status(404).json({ message: "noooo" });
    const matchPassword = Admin_User.matchPassword(userFound.Contrasena, req.body.Contrasena);
    if (!matchPassword)
        return res.status(401).json({ token: null, message: "contraseña invalida como en los teleton xdxdxdd" });
    const token = jwt.sign({ id: userFound._id }, process.env.secretveterinarian);
});
exports.singinUser = singinUser;
