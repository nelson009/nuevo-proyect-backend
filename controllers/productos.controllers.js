//controller la unica responsabilidad que tiene es recibir la peticion del cliente(req) y entregar la respuesta del cliente(res) .No se encarga de nada mas y redirigir en caso de algun error al middleare de error
const {
    obtenerProductos,
    obtenerProductoXId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
} = require('../services/productos/productos.service');
// const { STATUS } = require('../utils/constants/api.constants');
// const { apiSuccessResponse } = require('../utils/utils');

const listarProductosController = async () => {
    try {
        return await obtenerProductos();
    }
    catch (error) {
        console.log('error listando productos ==>',error)
    }
};

const  listarProductoIdController = async ({ id }) => {
    try {
       return await obtenerProductoXId(id);
    }
    catch (error) {
        console.log('error listando productos por ID ==>',error)
    }
};

const guardarProductoController = async ({ datos }) => {
    try {
        return await agregarProducto(datos);
        // res.redirect('/');
    }
    catch (error) {
        console.log('error guardando productos ==>',error)
    }
};

const actualizarProductoController = async ({ id, datos }) => {
    try {
        return await actualizarProducto(datos,id);
    }
    catch (error) {
        console.log('error actualizando producto ==>',error)
    }
};

const eliminarProductoController = async ( { id } ) => {
    try {
        return await eliminarProducto(id);
    }
    catch (error) {
        console.log('error eliminando productos ==>',error)
    }
};

module.exports = {
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController,
};