const express = require('express');
const router = express.Router();
const orderController = require('../Controller/orderController');

router.post('/', orderController.createOrder);
router.get('/:id', orderController.getOrderById);
router.patch('/:id', orderController.updateOrderById);
router.delete('/:id', orderController.deleteOrderById);

module.exports = router;
