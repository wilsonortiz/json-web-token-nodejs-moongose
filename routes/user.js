'use strict'

const express = require('express');
const userCtrl = require("../controllers/user");
const api = express.Router();

api.post("/user/signup", userCtrl.signUp);
api.post("/user/signin", userCtrl.signIn);

module.exports = api;
