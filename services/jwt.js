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
