const express = require('express');
const detalleCompra = require('../../controllers/detalleCompra.constollers');
const router = express.Router();

router.get('/', detalleCompra);

module.exports = router;