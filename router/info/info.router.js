const express = require('express');
const infoPrograma = require('../../controllers/info.controllers')
const router = express.Router();

// obtener informacion del sistema por precess
router.get('/', infoPrograma);

module.exports = router;