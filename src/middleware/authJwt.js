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
exports.isUser = exports.isVeterinarian = exports.verifyTokenAdmin = exports.verifyTokenVeterinarian = void 0;
const JWTAuth = require("jsonwebtoken");
const veterinarianAuth = require("./../model/Veterinarias");
const adminAuth = require("./../model/Admin");
const usernAuth = require("./../model/usuario");
const Role = require("./../model/rule");
const verifyTokenVeterinarian = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).json({ message: "No token provided" });
    try {
        const decoded = JWTAuth.verify(token, process.env.secretveterinarian);
        req.GlobaluserId = decoded.id;
        const user = yield veterinarianAuth.findById(req.GlobaluserId, { password: 0 });
        if (!user)
            return res.status(404).json({ message: "No user found" });
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
});
exports.verifyTokenVeterinarian = verifyTokenVeterinarian;
const verifyTokenAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token = req.headers["x-access-token"];
    if (!token)
        return res.status(403).json({ message: "No token provided" });
    try {
        const decoded = JWTAuth.verify(token, process.env.secretveterinarian);
        req.GlobaluserId = decoded.id;
        console.log(decoded);
        const user = yield adminAuth.findById(req.GlobaluserId, { password: 0 });
        if (!user)
            return res.status(404).json({ message: "No user found" });
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Unauthorized!" });
    }
});
exports.verifyTokenAdmin = verifyTokenAdmin;
const isVeterinarian = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield veterinarianAuth.findById(req.GlobaluserId);
        const roles = yield Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "Veterinario") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "necesitas ser un veterinario!" });
    }
    catch (error) {
        return res.status(500).send({ message: error });
    }
});
exports.isVeterinarian = isVeterinarian;
const isUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield usernAuth.findById(req.GlobaluserId);
        const roles = yield Role.find({ _id: { $in: user.roles } });
        for (let i = 0; i < roles.length; i++) {
            if (roles[i].name === "Usuario") {
                next();
                return;
            }
        }
        return res.status(403).json({ message: "necesitas ser un usuario!" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).send({ message: error });
    }
});
exports.isUser = isUser;
