'use strict'

const mongoose = require("mongoose");
const app = require('./app');
const config = require('./config')

mongoose.connect(config.db, {
  useNewUrlParser: true
}, (err, res) => {
  if (err) {
    return console.log("Error en la conexión a la BD", err);
  } else {
    console.log("Conexión establecida...");

    app.listen(config.port, () => {
      console.log(`API REST http://localhost:${config.port}`);
    });
  }
});
