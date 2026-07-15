const express = require('express');
const controllers = require('../controllers/account.controllers');
const { requireAuth } = require('../middleware/auth.middleware');

const router = express.Router();
router.use('/account', requireAuth);
router.get('/account/profile', controllers.displayProfile);
router.put('/account/profile', controllers.updateProfile);
router.get('/account/orders', controllers.displayOrders);
router.get('/account/favorites', controllers.displayFavorites);
router.post('/account/favorites/:productId', controllers.addFavorite);
router.delete('/account/favorites/:productId', controllers.removeFavorite);
module.exports = router;
