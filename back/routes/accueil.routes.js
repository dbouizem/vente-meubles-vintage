const express = require('express');
const router = express.Router();
const controllers = require('../controllers/accueil.controllers');

router.get('/meubles', controllers.displayObjectmeubles);
router.get('/categories', controllers.displayCategories);

module.exports = router;
