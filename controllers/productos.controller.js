const {
    obtenerProductos,
    obtenerProductoXId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
} = require('../services/productos/productos.service.js');
const { STATUS } = require('../utils/constants/api.constants');
const listarProductosController = async (ctx) => {
    try {
        const productos = await obtenerProductos();
        ctx.response.status = STATUS.OK;
        ctx.body = productos
    }
    catch (error) {
        console.log(error)
    }
};

const  listarProductoIdController = async (ctx) => {
    try {
        const {id} = ctx.params;
        const producto = await obtenerProductoXId(id);
        if(producto.error) {
            ctx.response.status = 404;
            ctx.body = producto.error;
        } else {
            ctx.status = STATUS.OK;
            ctx.body = producto
        }
    }
    catch (error) {
        console.log(error)
    }
};

const guardarProductoController = async (ctx) => {
    try {
        const newProduct = ctx.request.body;
        const saveProducto = await agregarProducto(newProduct);
        if(saveProducto === false) {
            ctx.response.status = 404;
            ctx.body = {error: 'producto no encontrado'};
        }else {
            ctx.response.status = STATUS.CREATED;
            ctx.body = saveProducto
        }
       
    }
    catch (error) {
        console.log(error)
    }
};

const actualizarProductoController = async (ctx) => {
    try {
        const {id} = ctx.params;
        const newProduct = ctx.request.body;
        const result =  await actualizarProducto(newProduct,id);
        if(result === false) {
            ctx.response.status = 404;
            ctx.body = {error: 'producto no encontrado'};
        } else {
            ctx.response.status = STATUS.CREATED;
            ctx.body = result
        }
    }
    catch (error) {
        console.log(error)
    }
};

const eliminarProductoController = async(ctx) => {
    try {
        const {id} = ctx.params;
        const result = await eliminarProducto(id);
        if(result === false) {
            ctx.response.status = 404;
            ctx.body = {error: 'producto no encontrado'};
        } else {
            ctx.response.status = STATUS.OK;
            ctx.body = result
        }
    }
    catch (error) {
        console.log(error)
    }
};

module.exports = {
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController,
 };