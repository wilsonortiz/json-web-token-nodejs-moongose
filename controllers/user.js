'use strict';

const User = require('../models/user');
const { createToken } = require('../services/jwt')
const bcrypt = require('bcrypt');

function signUp(req, res) {
    let user = new User({ email: req.body.email, displayName: req.body.displayName, password: req.body.password })

    if (!user.email || !user.displayName || !user.password) {
        return res.status(400).send({ message: 'Ingrese los campos obligatorios' })
    }

    user.save((err) => {
        if (err) {
            return res.status(500).send({ message: `Error al salvar el usuario: ${err}` });
        }

        return res.status(200).send({ message: 'Usuario creado', user });
    })

}

function signIn(req, res) {

    let email = req.body.email;
    let password = req.body.password;

    if (!email) {
        return res.status(400).send({ message: 'Favor ingrese su correo' })
    }
    if (!password) {
        return res.status(400).send({ message: 'Favor ingrese su cotraseña' })
    }

    User.findOne({
        email: email.toLowerCase()
    }, (err, user) => {

        if (err) {
            return res.status(500).send({ message: `Error en el servidor ${err}` });
        }

        if (!user) {
            return res.status(404).send({ message: "Usuario no encontrado" });
        }

        bcrypt.compare(password, user.password, function (err, isMatch) {
            if (err) {
                return res.status(500).send({ message: `Error en el servidor: ${err}` })
            }

            if (!isMatch) {
                return res.status(400).send({ message: 'Contraseña erronea' })

            } else {
                //TODO: pendiente actualizar lastLogin para controlar el ultimo acceso

                createToken(user)
                    .then(token => {
                        return res.status(200).send({ result: true, token: token });
                    })
                    .catch(err => {
                        return res.status(500).send({ result: false, message: err });
                    })


            }
        });

    });

}

module.exports = {
    signUp,
    signIn
}