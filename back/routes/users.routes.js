const express = require('express')
const router = express.Router()
const controllers = require('../controllers/users.controllers')

// Route pour créer un utilisateur
router.post('/signup',controllers.createObject)

router.post('/login',controllers.checkLogin)


module.exports = router 
