"use strict";
const Email = /m$/;
const Password = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/;
module.exports = {
    Email,
    Password
};
//every bien aqui
