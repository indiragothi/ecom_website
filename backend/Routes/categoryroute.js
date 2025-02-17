const express = require('express');
const { createcategory, getcategory, updatecategory, deletecategory } = require('../Controller/categorycontroller')
const validateApiKey = require('../middleware/api-key-middleware');
const { isAuthenticatedUser } = require('../middleware/auth')
const category = express.Router();


category.post('/add-category', createcategory)
category.get('/get-category', getcategory)
category.put('/category/:id', updatecategory)
category.delete('/category/:id', deletecategory)


module.exports = category;