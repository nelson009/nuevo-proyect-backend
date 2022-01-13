const { MemoriaApi } = require('../models/index')

const memoria = new MemoriaApi();

const listarProductosController = (req, res) => {
    const products =  memoria.getProduct()
    res.render('pug/index.pug', {products})
}

const listarProductoIdController = (req, res) => {
    const {id} = req.params;
    const producto = memoria.getProductId(id)
    if(!producto){

       return res.status(404).send({error: 'producto no encontrado'})
    }
    res.status(200).json(producto)
}

const guardarProductoController = (req , res) => {
    const newProduct = req.body;
    console.log(newProduct)
    if( !newProduct.title || !newProduct.price || !newProduct.thumbnail){

        return  res.status(404).send({error: 'producto no encontrado'})
    }
    memoria.addProduct(newProduct)

    res.redirect('/')
}

const actualizarProductoController = (req, res) => {
    const {id} = req.params;
    const newProduct = req.body
    const producto = memoria.getProductId(id)
    if(!producto || !newProduct.title || !newProduct.price || !newProduct.thumbnail){

        return  res.status(404).send({error: 'producto no encontrado'})
    }
    res.json(memoria.updateProduct(newProduct, id))
}

const eliminarProductoController = (req, res) => {
    const {id} = req.params;
    const producto = memoria.getProductId(id)
    if(!producto){

        return res.status(404).send({error: 'producto no encontrado'})
    }
    memoria.deleteProduct(id)

    res.json('producto eliminado correctamente')
}

module.exports = {
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController,
}