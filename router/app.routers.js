const express = require('express');
const rutasProductos = require('./productos/productos.routes');
const rutasCarrito = require('./carrito/carrito.routes');
const rutaFaker = require('./pructosFaker/productFaker.routes')

const router = express.Router();

router.use('/productos', rutasProductos,);
router.use('/carrito', rutasCarrito);
router.use('/productos-test', rutaFaker);

module.exports = router;