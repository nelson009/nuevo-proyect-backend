const express = require('express');
const detalleCompraController = require('../../controllers/detalleCompra.constollers');
const router = express.Router();

// se envia correo electronico, WhatsApp con los datos de los productos comprados al usuario y se elimina el carrito
router.get('/', detalleCompraController);

module.exports = router;