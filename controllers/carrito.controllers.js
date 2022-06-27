const {
    createCart,
    deleteCart,
    listProductCart,
    addProductEnCart,
    deleteProducXIdEnCart,
} = require('../services/carrito/carrito.service');

// crea un carrito para el usuario y devuelve el id del carrito o error de sesion
const crearCarritoController = async (req, res) => {
    const result = await createCart(req);
    if(result === false) return res.status(404).json('sesion expirada')

    return res.json(result)
}

// elimina el carrito del usuario y devuelve un mensaje con exito o error al obtener id
const eliminarCarritoController = async (req, res) => {
    const { id } = req.params;
    const carritoEliminado = await deleteCart(id, req)
    if (carritoEliminado.error) return res.status(404).send(carritoEliminado.error);

    return res.json(carritoEliminado)
}

// obtiene array de productos del carrito por id del mismo
const listarProductosDeCarritoController = async (req, res) => {
    const { id } = req.params;
    const productosDeCarrito = await listProductCart(id, req)
    if (productosDeCarrito.error) return res.status(404).send(productosDeCarrito.error);

    return res.json(productosDeCarrito);
}

// guarda productos en el carrito por id y devuelve datos del producto
const guardarProductosEnCarritoController = async (req, res) => {
    const { id } = req.params;
    const product = await addProductEnCart(id,req);
    if (product === false) return res.status(404).json({ error: `El producto con id ${id} no  existe` });

    res.json(product);
}

// elimina productos del carrito por id del carrito, producto y devuelve un mensaje de eliminado
const eliminarProductoPorIDEnCarritoController = async (req, res) => {
    const { id, id_prod } = req.params;
    const productoEnCarritoEliminado = await deleteProducXIdEnCart(id, id_prod, req);
    if (productoEnCarritoEliminado === false) return res.status(404).json('sesion exirada');
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