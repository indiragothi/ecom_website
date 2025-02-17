const express = require('express');
const { addToCart, countAddToCartProduct, viewAddToCartProduct, updateAddToCartProduct, deleteAddToCartProduct } = require('../Controller/cartcontroller')
const { isAuthenticatedUser } = require('../middleware/auth')
// const { authToken } = require('../middleware/authToken')

const cart = express.Router();

cart.post('/add-to-cart', addToCart);
cart.get('/cart-count', countAddToCartProduct)
cart.get('/view-cart', viewAddToCartProduct)
cart.put('/update-cart', updateAddToCartProduct)
cart.delete('/delete-cart', deleteAddToCartProduct)

module.exports = cart;
