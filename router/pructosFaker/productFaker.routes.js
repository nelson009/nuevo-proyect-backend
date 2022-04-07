const express = require('express');
const listaDeProductosFaker = require('../../controllers/productoFaker.controllers')
const router = express.Router();

router.get('/', listaDeProductosFaker);

module.exports = router;