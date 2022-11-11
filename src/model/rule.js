"use strict";
const mongooseRule = require("mongoose");
const RuleSchema = mongooseRule.Schema({
    name: String
}, {
    versionKey: false
});
module.exports = mongooseRule.model("Role", RuleSchema);
