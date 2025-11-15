const express = require('express');
const router = express.Router();
const {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} = require('../controllers/cartController');
const { protect } = require('../middleware/auth');
const { transactionLimiter } = require('../middleware/rateLimiter');

router.get('/', protect, getCart);
router.post('/', protect, transactionLimiter, addToCart);
router.put('/', protect, transactionLimiter, updateCartItem);
router.delete('/:productId', protect, transactionLimiter, removeFromCart);
router.delete('/', protect, transactionLimiter, clearCart);

module.exports = router;
