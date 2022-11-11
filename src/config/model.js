"use strict";
const mongoClient = require('mongoose');
mongoClient.connect(process.env.DBconnect, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((db) => console.log(`${db} is conected in ${process.env.DBconnect}`))
    .catch((err) => { console.log(`${err.message}`); });
//every bien aqui
