const express = require('express');
const{
    crearCarritoController,
    eliminarCarritoController,
    listarProductosDeCarritoController,
    guardarProductosEnCarritoController,
    eliminarProductoPorIDEnCarritoController,
} = require('../../controllers/carrito.controllers');
const router = express.Router();

// se crea el carrito del usuario
router.post('/', crearCarritoController);

// se elimina el carrito del usuario por id 
router.delete('/:id', eliminarCarritoController);

// obtiene el areglo de productos del carrito por id
router.get('/:id/productos', listarProductosDeCarritoController);

// se incorpora productos en el carrito por id
router.post('/:id/productos', guardarProductosEnCarritoController);

// se elimina productos del carrito por id del carrito, producto
router.delete('/:id/productos/:id_prod', eliminarProductoPorIDEnCarritoController);

module.exports = router;