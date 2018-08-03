'use strict'

const express = require('express');
const productCtrl = require("../controllers/product");
const api = express.Router();
const auth = require('../middlewares/auth')

api.post("/product/", auth, productCtrl.saveProduct); //save
api.get("/product/:id", productCtrl.getProduct); //get
api.get("/products", productCtrl.getProducts); //getAll
api.put("/product/:id", auth, productCtrl.updateProduct); //update
api.delete("/product/:id", auth, productCtrl.deleteProduct); //delete

module.exports = api;
