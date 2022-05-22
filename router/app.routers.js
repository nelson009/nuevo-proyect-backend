const express = require('express');
const errorMiddleware = require('../middleware/error.middleware');
const rutasProductos = require('./productos/productos.routes');
const rutasCarrito = require('./carrito/carrito.routes');
const rutaFaker = require('./pructosFaker/productFaker.routes')
const rutaNumberRandom = require('./randomNumber/process.router');
const rutacompraFinalizada = require('./detalleCompra/detalleCompra.routes');
const rutaInfo = require('./info/info.router');
const compression = require('compression');
const rutaPerfil = require('./profile/profile.routes');
const loginAuth = require('./web/login.auth');
const auth = require('../middleware/auth');


const router = express.Router();
// Middleware

// Roustes
router.use('/api/productos', rutasProductos,);
router.use('/api/carrito', rutasCarrito);
router.use('/api/productos-test', rutaFaker);
router.use('/api',rutaNumberRandom);
router.use('/compra-finalizada', rutacompraFinalizada);
router.use('/info', compression(), rutaInfo);
router.use('/profile', auth, rutaPerfil);
router.use(loginAuth);

// Error middleware
router.use(errorMiddleware);

module.exports = router;
