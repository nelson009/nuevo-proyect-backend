const express = require('express');
const detalleCompraController = require('../../controllers/detalleCompra.constollers');
const router = express.Router();

router.get('/', detalleCompraController);

module.exports = router;