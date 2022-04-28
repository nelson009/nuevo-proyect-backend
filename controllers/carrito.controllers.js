
const { productosApi } = require('../models/index');
const { carrito } = require('../models/index');

const crearCarrito = async (req, res) => {
    if(!req.user) {
        return res.status(200).json('sesion expirada')
    }

    return res.status(200).json(await carrito.createCarrito(req))
}

const eliminarCarrito = async (req, res) => {
    const { id } = req.params;
    const carritoEliminado = await carrito.deleteCarrito(id, req)
    if (carritoEliminado.error) return res.status(404).send(carritoEliminado.error);

    return res.json(carritoEliminado)
}

const listarProductosDeCarrito = async (req, res) => {
    const { id } = req.params;
    const productosDeCarrito = await carrito.getProductEnCarrito(id, req)
    if (productosDeCarrito.error) return res.status(404).send(productosDeCarrito.error);

    return res.json(productosDeCarrito);
}

const guardarProductosEnCarrito = async (req, res) => {
    const { id } = req.params;
    const productId = await productosApi.getProductId(id)
    if (!productId) {

        return res.status(404).json({ error: `El producto con id ${id} no se existe` })
    }
    res.status(200).json(await carrito.addProductAcarrito(productId, req));
    // res.status(200).json(await carrito.addProductAcarrito(req))
}

const eliminarProductoPorIDEnCarrito = async (req, res) => {
    if(!req.user) {
        return res.status(200).json('expiro la sesion del usuario')
    }

    const { id, id_prod } = req.params;
    const productoEnCarritoEliminado = await carrito.deleteProductDeCarrito(id, id_prod, req);
    if (productoEnCarritoEliminado) return res.status(404).send(productoEnCarritoEliminado.error);
    productoEnCarritoEliminado

    res.json( "PRODUCTO EN CARRITO ELIMINADO" );
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    listarProductosDeCarrito,
    guardarProductosEnCarrito,
    eliminarProductoPorIDEnCarrito,
};