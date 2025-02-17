const express = require('express');
const { isAuthenticatedUser } = require('../middleware/auth');
const { addToWishlist, viewWishlist, deleteFromWishlist, countAddToWishlistProduct } = require('../Controller/wishlistcontroller');

const wishlist = express.Router();

wishlist.post('/add-to-wishlist', addToWishlist);
wishlist.get('/count-wishlist', countAddToWishlistProduct)
wishlist.get('/view-wishlist', viewWishlist)
wishlist.delete('/delete-from-wishlist', deleteFromWishlist)

module.exports = wishlist;
