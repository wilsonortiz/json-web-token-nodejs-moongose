'use strict';

const Product = require("../models/product");

function saveProduct(req, res) {
  let product = new Product();
  product.name = req.body.name;
  product.picture = req.body.picture;
  product.price = req.body.price;
  product.category = req.body.category;
  product.description = req.body.description;

  product.save((err, productStored) => {
    if (err) {
      return res.status(500).send({message: "Error al salvar el producto", err});
    }

    res.status(200).send({product: productStored, message: "producto almacenado"});
  });
}

function getProduct(req, res) {
  let productID = req.params.id;

  if (!productID || productID == null) {
    return res.status(400).send({message: "error al recuperar el producto"});
  }

  Product.findById(productID, (err, product) => {
    if (err) {
      return res.status(500).send({message: `Error en el servidor ${err}`});
    }
    if (!product) {
      return res.status(404).send({message: "El producto no existe"});
    }

    return res.status(200).send(product);
  });
}

function getProducts(req, res) {
  Product.find({}, (err, products) => {
    if (err) {
      return res.status(500).send({message: `Error en el servidor ${err}`});
    }

    if (!products) {
      return res.status(404).send({message: "no existen productos"});
    }

    return res.status(200).send(products);
  });
}

function updateProduct(req, res) {
  let productID = req.params.id;
  let update = req.body;

  if (!productID) {
    return res.status(400).send({message: "Faltan campos obligatorios"});
  }

  Product.findByIdAndUpdate(productID, update, (err, productUpdate) => {
    if (err) {
      return res.status(500).send({message: `Error en el servidor ${err}`});
    }
    if (!productUpdate) {
      return res.status(404).send({message: 'no se encuentra el producto requerido'});
    }

    return res.status(200).send({product: productUpdate});
  });
}

function deleteProduct(req, res) {
  let productID = req.params.id;

  if (!productID || productID == null) {
    return res.status(400).send({message: "error al recuperar el producto"});
  }

  Product.findById(productID, (err, product) => {
    if (err) {
      return res.status(500).send({message: `Error en el servidor ${err}`});
    }

    product.remove(err => {
      if (err) {
        return res.status(404).send({message: `el producto no exite ${err}`});
      }

      res.status(200).send({message: "el producto ha sido eliminado"});
    });
  });
}

module.exports = {
  saveProduct,
  getProduct,
  getProducts,
  updateProduct,
  deleteProduct

}
