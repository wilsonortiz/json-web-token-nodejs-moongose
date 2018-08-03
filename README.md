# json-web-token-nodejs-moongose
API con mongoDB ,que crea usuarios encriptando su contraseña.alida el login generando un token con jwt + CRUD de productos que valida la autorización al crear, editar y eliminar.

jwt.js -->
'use strict';

const jwt = require('jsonwebtoken')
const moment = require('moment')
const config = require('../config')

function createToken(user) {

  let payLoad = {
    sub: user.email
  }

  let expiresIn = 1440;

  let token = jwt.sign(payLoad, config.SECRET_TOKEN, {expiresIn});

  return token;
}

function decodeToken(token) {

  let decoded = new Promise((resolve, reject) => {
    jwt.verify(token, config.SECRET_TOKEN, (err, decoded) => {
      if (err) {
        reject(err)
      }
      resolve(decoded)
    });
  });

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}



  "dependencies": {
    "bcrypt": "^3.0.0",
    "body-parser": "^1.18.3",
    "express": "^4.16.3",
    "jsonwebtoken": "^8.3.0",
    "moment": "^2.22.2",
    "mongoose": "^5.2.6",
    "morgan": "^1.9.0",
    "nodemon": "^1.18.3"
  }
  
  
