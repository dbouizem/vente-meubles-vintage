const express = require('express');
const router = express.Router();
const controllers = require('../controllers/admin.controllers');
const { requireAdmin } = require('../middleware/auth.middleware');

router.get('/admin/products', requireAdmin, controllers.displayProducts);
router.get('/admin/products/:id', requireAdmin, controllers.displayProduct);
router.post('/admin/:id', requireAdmin, controllers.deleteObject);

router.put('/admin/:id', requireAdmin, controllers.updateObject);

module.exports = router;
