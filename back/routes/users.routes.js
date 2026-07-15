const express = require('express');
const router = express.Router();
const controllers = require('../controllers/users.controllers');

// Route pour créer un utilisateur
router.post('/signup', controllers.createObject);

router.post('/login', controllers.checkLogin);
router.post('/forgot-password', controllers.forgotPassword);
router.post('/reset-password', controllers.resetPassword);

module.exports = router;
