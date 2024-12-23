const express = require('express');
const router = express.Router();
const { requestProduct } = require('../controllers/ProductRequestController');

router.post('/products/request', requestProduct);

module.exports = router;
