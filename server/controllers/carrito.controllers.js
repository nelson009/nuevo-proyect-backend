
const {productosApi} = require('../models/index')
const {carrito} = require('../models/index');

const  crearCarrito = async (req, res) => {

    return res.status(200).json(await carrito.createCarrito())
}

const eliminarCarrito = async (req, res) => {
    const { id } = req.params;
    const carritoEliminado = await carrito.deleteCarrito(id)
    if (carritoEliminado.error) return res.status(404).send(carritoEliminado.error);

    return res.json(carritoEliminado)
}

const listarProductosDeCarrito = async(req, res ) => {
    const {id} = req.params;
    const productosDeCarrito = await carrito.getProductEnCarrito(id)
    if(productosDeCarrito.error) return res.status(404).send(productosDeCarrito.error);

    return res.json(productosDeCarrito);
}

const guardarProductosEnCarrito = async (req, res) => {
    const {id} = req.params;
    const productId = await productosApi.getProductId(id)
    if(!productId){

        return res.status(404).json({error: `El producto con id ${id} no se existe`})
    }
    res.status(200).json(await carrito.addProductAcarrito(productId))
}

const eliminarProductoPorIDEnCarrito = async (req,res) => {
    const { id, id_prod } = req.params;
    const productoEnCarritoEliminado = await carrito.deleteProductDeCarrito( id,id_prod );
    if( productoEnCarritoEliminado  ) return res.status(404).send( productoEnCarritoEliminado.error );

    res.json( productoEnCarritoEliminado );
  
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    listarProductosDeCarrito,
    guardarProductosEnCarrito,
    eliminarProductoPorIDEnCarrito,
};