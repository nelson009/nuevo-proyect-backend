const express = require('express');
const OnlyAdminsPrivilege = require('../../middleware/autorizacion');
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

router.post('/',OnlyAdminsPrivilege, guardarProductoController);

router.put('/:id',OnlyAdminsPrivilege, actualizarProductoController);

router.delete('/:id',OnlyAdminsPrivilege, eliminarProductoController);

module.exports = router;