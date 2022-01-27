const express = require('express');
const rutasProductos = require('./productos/productos.routes');
const rutasCarrito = require('./carrito/carrito.routes')
// const OnlyAdminsPrivilege = require('../middlewares/autorizacion')
const router = express.Router();

//Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/productos', rutasProductos,);
router.use('/carrito', rutasCarrito)

module.exports = router