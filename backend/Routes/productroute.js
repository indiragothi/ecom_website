const express = require('express');
const { createproduct, getproduct, updateproduct, deleteproduct, getsingleproduct, getproductbyslug } = require('../Controller/productcontroller')
const validateApiKey = require('../middleware/api-key-middleware');
const { isAuth } = require('../middleware/auth')
const product = express.Router();


product.post('/add-product', createproduct)
product.get('/product', getproduct)
product.put('/product/:id', updateproduct)
product.delete('/product/:id', deleteproduct)
product.get('/product/:id', getsingleproduct)
product.get('/product/:slug', getproductbyslug)

module.exports = product;