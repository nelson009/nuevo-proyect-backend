// const { ProductosFs } = require('../models/index')
// const { MemoriaApi } = require('../models/index')
const { ProductosMDB } = require('../models/index')

const productosApi = new ProductosMDB('productos', {
    client : 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'basededatoscoder'
    }
});

const listarProductosController = async (req, res) => {
    const products = await productosApi.getProduct()
    res.render('main', {products})
}

const  listarProductoIdController = async (req, res) => {
    const {id} = req.params;
    const producto = await productosApi.getProductId(id)
    if(!producto){

       return res.status(404).send({error: 'producto no encontrado'})
    }
    res.status(200).json(producto)
}

const guardarProductoController = async (req , res) => {
    const newProduct = req.body;
    console.log(newProduct)
    if( !newProduct.nombre || !newProduct.precio || !newProduct.foto){

        return  res.status(404).send({error: 'producto no encontrado'})
    }
    await productosApi.addProduct(newProduct)

    res.redirect('/')
}

const actualizarProductoController = async (req, res) => {
    const {id} = req.params;
    const newProduct = req.body
    const producto = await productosApi.getProductId(id)
    if(!producto ||  !newProduct.nombre || !newProduct.precio || !newProduct.foto || !newProduct.descripcion || !newProduct.codigo || !newProduct.stock){

        return  res.status(404).send({error: 'producto no encontrado'})
    }
    res.json(await productosApi.updateProduct(newProduct, id))
}

const eliminarProductoController = async (req, res) => {
    const {id} = req.params;
    const producto = await productosApi.getProductId(id)
    if(!producto){

        return res.status(404).send({error: 'producto no encontrado'})
    }
    await productosApi.deleteProduct(id)

    res.json('producto eliminado correctamente')
}

module.exports = {
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController,
    productosApi,
}