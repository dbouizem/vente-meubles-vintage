const express = require('express');
const controllers = require('../controllers/orders.controllers');

const router = express.Router();

router.post('/orders', controllers.createOrder);
router.get('/orders/:token', controllers.displayOrder);

module.exports = router;
