const express = require('express');
const { createProduct, getProducts, deleteProduct } = require('../controllers/products.js');
const { isAuthorized } = require('../controllers/users.js');

const router = express.Router();

router.get('/', isAuthorized, getProducts);
router.post('/create', isAuthorized, createProduct);
router.post('/delete', isAuthorized, deleteProduct);

module.exports = router;