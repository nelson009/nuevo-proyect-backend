const { productosApi } = require('../../models/index');

const obtenerProductos = async () => {
    return await productosApi.getProduct();
};

const obtenerProductoXId = async (id) => {
    const productoId = await productosApi.getProductId(id);
    if (!productoId) {
        return { error: 'producto no encontrado' };
    }

    return productoId;
};

const agregarProducto = async (newProduct) => {
    if (!newProduct.nombre || !newProduct.precio || !newProduct.foto) {
        return false;
    }

    await productosApi.addProduct(newProduct);
};

const actualizarProducto = async (newProduct, id) => {
    const producto = await productosApi.getProductId(id);
    if (!producto || !newProduct.nombre || !newProduct.precio || !newProduct.foto || !newProduct.descripcion || !newProduct.codigo || !newProduct.stock) {
        return false;
    };

    return await productosApi.updateProduct(newProduct, id);
};

const eliminarProducto = async (id) => {
    const productoXId = await productosApi.getProductId(id);
    if (!productoXId) {
        return false;
    };
    await productosApi.deleteProduct(id);

    return 'producto eliminado correctamente';
}

module.exports = { obtenerProductos, obtenerProductoXId, agregarProducto, actualizarProducto, eliminarProducto };