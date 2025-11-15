const express = require('express');
const router = express.Router();
const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productController');
const { protect, admin } = require('../middleware/auth');
const { apiLimiter, createLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .get(apiLimiter, getProducts)
  .post(createLimiter, protect, admin, createProduct);

router.route('/:id')
  .get(apiLimiter, getProduct)
  .put(apiLimiter, protect, admin, updateProduct)
  .delete(apiLimiter, protect, admin, deleteProduct);

module.exports = router;
