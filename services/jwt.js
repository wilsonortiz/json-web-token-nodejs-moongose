'use strict';

const jwt = require('jsonwebtoken')
const { SECRET_TOKEN } = require('../config')

function createToken(user) {

  return new Promise((resolve, reject) => {

    let payLoad = {
      sub: user.email
    }

    let options = {
      expiresIn: 1440
    }

    jwt.sign(payLoad, SECRET_TOKEN, options, (err, token) => {
      if (err)
        return reject(`${err}`);
      else
        resolve(token);

    });
  });
}

function decodeToken(token) {

  return new Promise((resolve, reject) => {
    jwt.verify(token, SECRET_TOKEN, (err, decoded) => {
      if (err) {
        reject(`${err}`)
      }
      resolve(decoded)
    });
  });
}

module.exports = {
  createToken,
  decodeToken
}
