"use strict";
const mongooseMascotas = require("mongoose");
const MascotasSchema = mongooseMascotas.Schema({
    Nombre: String,
    Propietario: String,
    Raza: String,
    Tipo: String,
    Peso: String,
    RecordVacunas: [String],
    Enfermedades: [String],
    Alergias: [String],
    Latitud: Number,
    Longitud: Number,
}, {
    versionKey: false
});
module.exports = mongooseMascotas.model("Mascotas", MascotasSchema);
