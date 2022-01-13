const express = require('express');
const{
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController
} = require("../../controllers/productos.controllers");
const router = express.Router();

router.get('/', listarProductosController);

router.get('/:id', listarProductoIdController);

router.post('/', guardarProductoController);

router.put('/:id', actualizarProductoController);

router.delete('/:id', eliminarProductoController);

module.exports = router;