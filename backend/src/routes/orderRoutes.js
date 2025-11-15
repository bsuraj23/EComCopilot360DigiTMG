const express = require('express');
const router = express.Router();
const {
  createOrder,
  getMyOrders,
  getOrderById,
  getAllOrders,
  updateOrderStatus,
  updateOrderToPaid
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/auth');
const { apiLimiter, createLimiter } = require('../middleware/rateLimiter');

router.route('/')
  .post(createLimiter, protect, createOrder)
  .get(apiLimiter, protect, admin, getAllOrders);

router.get('/myorders', apiLimiter, protect, getMyOrders);

router.route('/:id')
  .get(apiLimiter, protect, getOrderById);

router.put('/:id/pay', apiLimiter, protect, updateOrderToPaid);
router.put('/:id/status', apiLimiter, protect, admin, updateOrderStatus);

module.exports = router;
