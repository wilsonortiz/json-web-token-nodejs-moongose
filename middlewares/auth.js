'use strict';

let { decodeToken } = require('../services/jwt');

function isAuth(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).send({ message: 'No tienes autorización' });
  }

  const token = req.headers.authorization.split(" ")[1];
  decodeToken(token)
    .then(res => {
      req.user = res;
      next()

    })
    .catch((err) => {
      return res.status(400).send({ result: false, message: `${err}` });
    });
}

module.exports = isAuth;
