//controller la unica responsabilidad que tiene es recibir la peticion del cliente(req) y entregar la respuesta del cliente(res) .No se encarga de nada mas y redirigir en caso de algun error al middleare de error
const {
    obtenerProductos,
    obtenerProductoXId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
} = require('../services/productos/productos.service');
const { STATUS } = require('../utils/constants/api.constants');
const { apiSuccessResponse } = require('../utils/utils');

// obtine un array de produtos 
const listarProductosController = async (req, res) => {
    try {
        const productos = await obtenerProductos();
        const response = apiSuccessResponse(productos, STATUS.OK);
        return res.status(STATUS.OK).json(response.data);
    }
    catch (error) {
        //en el catch lo que hacemos utilizar el next() para redirigir todos los erores a nuestro middleware de error
        next(error);
    }
};

// obtinene un producto por id
const  listarProductoIdController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const producto = await obtenerProductoXId(id);
        const response = apiSuccessResponse(producto, STATUS.OK);
        return res.status(STATUS.OK).json(response.data);
    }
    catch (error) {
        next(error);
    }
};

// guarda productos en la base de datos o array por body
const guardarProductoController = async (req , res, next) => {
    try {
        const newProduct = req.body;
        const saveProducto = await agregarProducto(newProduct);
        const response = apiSuccessResponse(saveProducto, STATUS.CREATED);
        return res.status(STATUS.CREATED).json(response.data);
        // res.redirect('/');
    }
    catch (error) {
        next(error);
    }
};

// actualiza productos del array por id, body
const actualizarProductoController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const newProduct = req.body;
        const result = await actualizarProducto(newProduct,id);
        const response = apiSuccessResponse(result, STATUS.OK);
        return res.status(STATUS.OK).json(response.data);
    }
    catch (error) {
        next(error);
    }
};

// elimina productos del array o base de datos por id 
const eliminarProductoController = async (req, res, next) => {
    try {
        const {id} = req.params;
        const result = await eliminarProducto(id);
        const response = apiSuccessResponse(result, STATUS.OK);
        return res.status(STATUS.OK).json(response.data);
    }
    catch (error) {
        next(error);
    }
};

module.exports = {
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController,
};