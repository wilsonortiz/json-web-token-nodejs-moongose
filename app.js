'use strict'

const express = require("express");
const bodyParser = require("body-parser");
let morgan = require('morgan');

const app = express();

//cargar rutas
const product_routes = require('./routes/product');
const user_routes = require('./routes/user');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// use morgan to log requests to the console
app.use(morgan('dev'));

// Configurar cabeceras y cors
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

//rutas base
app.use('/api', product_routes);
app.use('/api', user_routes);

module.exports = app;
