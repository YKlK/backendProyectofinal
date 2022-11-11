"use strict";
const routerIndex = require("express").Router();
routerIndex.get("/", (req, res) => {
    res.render(require("path").join(__dirname, "..", "..", "vistas", "index.mustache"));
});
module.exports = routerIndex;
