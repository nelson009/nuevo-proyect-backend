const express = require('express');
const rutasProductos = require('./productos/productos.routes');
const rutasCarrito = require('./carrito/carrito.routes');
const rutaFaker = require('./pructosFaker/productFaker.routes')
// const OnlyAdminsPrivilege = require('../middlewares/autorizacion')
const router = express.Router();

//Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/productos', rutasProductos,);
router.use('/carrito', rutasCarrito);
router.use('/productos-test', rutaFaker);

module.exports = router;