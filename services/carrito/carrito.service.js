const { productosApi} = require('../../models/index');
const {carrito} = require('../../models/index');

const createCart = async (req) => {
    if(!req.user) {
        return false;
    }

    return await carrito.createCarrito(req);
};

const deleteCart = async (idCarrito,req) => {

    return await carrito.deleteCarrito(idCarrito,req);
};

const listProductCart = async (id,req) => {

    return await carrito.getProductEnCarrito(id,req)
};

const addProductEnCart = async (id,req) => {
    const productXId = await productosApi.getProductId(id)
    if (!productXId) return false
       
    return await carrito.addProductAcarrito(productXId,req)
};

const deleteProducXIdEnCart = async (id,id_prod,req) => {
    if(!req.user) {
        return false;
    }

    return await carrito.deleteProductDeCarrito(id,id_prod,req);
};

module.exports = {
    createCart,
    deleteCart,
    listProductCart,
    addProductEnCart,
    deleteProducXIdEnCart,
};