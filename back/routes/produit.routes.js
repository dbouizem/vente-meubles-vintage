const express = require('express')
const router = express.Router()
const controllers = require('../controllers/produit.controllers')
const { requireAdmin } = require('../middleware/auth.middleware')

router.get('/meubles/:id',controllers.createObjectDetailProduct)
router.post('/meubles/create', requireAdmin, controllers.createNewProduct)

module.exports = router 
