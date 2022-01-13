const express = require('express');
const rutasProductos = require('./productos/productos.routes');

const router = express.Router();

//Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));

router.use('/productos', rutasProductos);

module.exports = router