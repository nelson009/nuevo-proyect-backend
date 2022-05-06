const express = require('express');
const{
    crearCarritoController,
    eliminarCarritoController,
    listarProductosDeCarritoController,
    guardarProductosEnCarritoController,
    eliminarProductoPorIDEnCarritoController,
} = require('../../controllers/carrito.controllers');
const router = express.Router();

router.post('/', crearCarritoController);

router.delete('/:id', eliminarCarritoController);

router.get('/:id/productos', listarProductosDeCarritoController);

router.post('/:id/productos', guardarProductosEnCarritoController);

router.delete('/:id/productos/:id_prod', eliminarProductoPorIDEnCarritoController);

module.exports = router;