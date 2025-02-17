const express = require('express');
const { createbrand, getbrand, updatebrand, deletebrand, getBrandByCategory } = require('../Controller/brandcontroller');
const validateApiKey = require('../middleware/api-key-middleware');
const { isAuthenticatedUser } = require('../middleware/auth');
const brand = express.Router();

brand.post('/add-brand', createbrand)
brand.get('/get-brand', getbrand)
brand.put('/brand/:id', updatebrand)
brand.delete('/brand/:id', deletebrand)
brand.get('/get-brands-by-category/:categoryId', getBrandByCategory)

module.exports = brand;