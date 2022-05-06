const {
    createCart,
    deleteCart,
    listProductCart,
    addProductEnCart,
    deleteProducXIdEnCart,
} = require('../services/carrito/carrito.service');

const crearCarritoController = async (req, res) => {
    const result = await createCart(req)
    if(result === false) return res.status(200).json('sesion expirada')

    return res.json(result)
}

const eliminarCarritoController = async (req, res) => {
    const { id } = req.params;
    const carritoEliminado = await deleteCart(id, req)
    if (carritoEliminado.error) return res.status(404).send(carritoEliminado.error);

    return res.json(carritoEliminado)
}

const listarProductosDeCarritoController = async (req, res) => {
    const { id } = req.params;
    const productosDeCarrito = await listProductCart(id, req)
    if (productosDeCarrito.error) return res.status(404).send(productosDeCarrito.error);

    return res.json(productosDeCarrito);
}

const guardarProductosEnCarritoController = async (req, res) => {
    const { id } = req.params;
    const product = await addProductEnCart(id,req);
    if (product === false) return res.status(404).json({ error: `El producto con id ${id} no se existe` });

    res.json(product);
}

const eliminarProductoPorIDEnCarritoController = async (req, res) => {
    const { id, id_prod } = req.params;
    const productoEnCarritoEliminado = await deleteProducXIdEnCart(id, id_prod, req);
    if (productoEnCarritoEliminado === false) return res.status(200).json('expiro la sesion del usuario');
    if (productoEnCarritoEliminado) return res.status(404).send(productoEnCarritoEliminado.error);

    res.json( "PRODUCTO EN CARRITO ELIMINADO" );
}

module.exports = {
    crearCarritoController,
    eliminarCarritoController,
    listarProductosDeCarritoController,
    guardarProductosEnCarritoController,
    eliminarProductoPorIDEnCarritoController,
};