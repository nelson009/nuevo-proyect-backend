// const { Carrito } = require('../models/index')
const { CarritoFs } = require('../models/index')
const { productosApi } = require('./productos.controllers') 

const carrito = new CarritoFs("./data/persistenciaFs/carrito.txt")

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
    const productId = await productosApi.getProductId(id_prod)
    const idCarrito = await carrito.readCarrito()
    if(!productId || idCarrito.id !== +id){

        return res.status(404).send({error: `El producto con id ${id} o el carrito con id ${idCarrito.id} no existe`})
    }
    res.status(200).json(await carrito.deleteProductDeCarrito(id,id_prod))
}

module.exports = {
    crearCarrito,
    eliminarCarrito,
    listarProductosDeCarrito,
    guardarProductosEnCarrito,
    eliminarProductoPorIDEnCarrito,
};