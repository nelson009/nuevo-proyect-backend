const express = require('express');
const profileController = require('../../controllers/profile.controllers');
const router = express.Router()

//se renderiza el perfil con los datos del usuario
router.get('/', profileController);

module.exports = router;