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
const initRoles = require(require("path").join("..", "model", "rule"));
const initadmin = require(require("path").join("..", "model", "Admin"));
const jwtinit = require("jsonwebtoken");
const createAdmin = () => __awaiter(void 0, void 0, void 0, function* () {
    const admin = yield initadmin.estimatedDocumentCount();
    if (admin > 0) {
        const token = yield initadmin.find({ Gmail: "3JPI@gmail.com" });
        const tokenAdmin = jwtinit.sign({ id: token._id }, process.env.secretveterinarian);
        console.log(tokenAdmin);
        return;
    }
    ;
    const token = new initadmin({ Gmail: "3JPI@gmail.com",
        Password: yield initadmin.encryptPassword(process.env.AdminPassword),
        Roles: yield initRoles.find({ name: "Admin" })._id
    }).save();
    const tokenAdmin = jwtinit.sign({ id: token._id }, process.env.secretveterinarian);
    console.log(tokenAdmin);
});
//"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NjgxODUzMTl9.omOAX16qYmtXDYBDH6Rg84ckESAUnGvPoJYRhXWC4eg" 
const createRoles = () => __awaiter(void 0, void 0, void 0, function* () {
    const count = yield initRoles.estimatedDocumentCount();
    if (count > 0)
        return;
    new initRoles({ name: 'Usuario' }).save();
    new initRoles({ name: 'Veterinario' }).save();
    new initRoles({ name: 'Admin' }).save();
});
module.exports = { createRoles, createAdmin };
