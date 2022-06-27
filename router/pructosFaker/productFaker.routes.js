const express = require('express');
const listaDeProductosFaker = require('../../controllers/productoFaker.controllers')
const router = express.Router();

// se renderiza una tabla con productos faker
router.get('/', listaDeProductosFaker);

module.exports = router;