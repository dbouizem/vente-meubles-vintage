const express = require('express');
const controllers = require('../controllers/orders.controllers');
const { optionalAuth } = require('../middleware/auth.middleware');

const router = express.Router();

router.post('/orders', optionalAuth, controllers.createOrder);
router.get('/orders/:token', controllers.displayOrder);

module.exports = router;
