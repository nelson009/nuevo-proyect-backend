
const  ContenedorMemoria  = require('../../models/product/memoria');
const productosApi = new ContenedorMemoria()

const obtenerProductos = async () => {
    return productosApi.getProduct();
};

const obtenerProductoXId = async (id) => {
    const productoId = productosApi.getProductId(id);
    if (!productoId) {
        return { error: 'producto no encontrado' };
    }

    return productoId;
};

const agregarProducto = async (newProduct) => {
    if (!newProduct.nombre || !newProduct.precio || !newProduct.foto) {
        return false;
    }

    return productosApi.addProduct(newProduct);
};

const actualizarProducto = async (newProduct, id) => {
    const producto =  productosApi.getProductId(id);
    if (!producto || !newProduct.nombre || !newProduct.precio || !newProduct.foto || !newProduct.descripcion || !newProduct.codigo || !newProduct.stock) {
        return false;
    };

    return  productosApi.updateProduct(newProduct, id);
};

const eliminarProducto = async (id) => {
    const productoXId =  productosApi.getProductId(id);
    if (!productoXId) {
        return false;
    };
    return productosApi.deleteProduct(id);
}

module.exports = { obtenerProductos, obtenerProductoXId, agregarProducto, actualizarProducto, eliminarProducto };