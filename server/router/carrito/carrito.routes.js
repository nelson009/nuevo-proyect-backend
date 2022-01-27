const express = require('express');
const{
    crearCarrito,
    eliminarCarrito,
    listarProductosDeCarrito,
    guardarProductosEnCarrito,
    eliminarProductoPorIDEnCarrito,
} = require('../../controllers/carrito.controllers');
const router = express.Router();

router.post('/', crearCarrito);

router.delete('/:id', eliminarCarrito);

router.get('/:id/productos', listarProductosDeCarrito);

router.post('/:id/productos', guardarProductosEnCarrito);

router.delete('/:id/productos/:id_prod', eliminarProductoPorIDEnCarrito);

module.exports = router;