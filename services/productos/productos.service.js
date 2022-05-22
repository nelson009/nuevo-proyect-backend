const ProductoSchema = require('../../models/schemas/Producto/Producto.schema');
const ProductsRepository = require('../../repositories/products.repository');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/error/CustomError');
const productsRepository = new ProductsRepository();

const obtenerProductos = async () => {
    return await productsRepository.getAll();
};

const obtenerProductoXId = async (id) => {
    if((!id)) {
        throw new CustomError(STATUS.BAD_REQUEST, 'el parámetro id no es válido o no existe');
    }

    return await productsRepository.getId(id);
};

const agregarProducto = async (newProduct) => {
    await validateProduct(newProduct);
    return await productsRepository.create(newProduct);
};

const actualizarProducto = async (newProduct, id) => {
    if(!id) {
        throw new CustomError(STATUS.BAD_REQUEST, 'el parámetro id no es válido o no existe');
    }
    await validateProduct(newProduct);
    return await productsRepository.update(newProduct, id);
};

const eliminarProducto = async (id) => {
    if(!id) {
        throw new CustomError(STATUS.BAD_REQUEST, 'el parámetro id no es válido o no existe');
    }
    return  await productsRepository.delete(id);
}

const validateProduct = async (product) => {
    try {
        await ProductoSchema.validate(product);
    }
    catch(error) {
        throw new CustomError(STATUS.BAD_REQUEST, 'validation error', error);
    }
}

module.exports = { obtenerProductos, obtenerProductoXId, agregarProducto, actualizarProducto, eliminarProducto };