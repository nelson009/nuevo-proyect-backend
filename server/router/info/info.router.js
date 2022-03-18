const express = require('express');
const infoPrograma = require('../../controllers/info.controllers')
const router = express.Router();

router.get('/', infoPrograma);

module.exports = router;