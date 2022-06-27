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

// obtiene el areglo de productos 
router.get('/', listarProductosController);

// obtiene un producto por id
router.get('/:id', listarProductoIdController);

// se incorpora un producto en la base de datos
router.post('/',OnlyAdminsPrivilege, guardarProductoController);

// se actualiza un producto de la base de datos por id
router.put('/:id',OnlyAdminsPrivilege, actualizarProductoController);

// se elimina un producto de la base de tados por id
router.delete('/:id',OnlyAdminsPrivilege, eliminarProductoController);

module.exports = router;