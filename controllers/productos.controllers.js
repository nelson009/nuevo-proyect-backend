const {
    obtenerProductos,
    obtenerProductoXId,
    agregarProducto,
    actualizarProducto,
    eliminarProducto,
} = require('../services/productos/productos.service')

const listarProductosController = async (req, res) => {

    res.status(200).json(await obtenerProductos());
};

const  listarProductoIdController = async (req, res) => {
    const {id} = req.params;
    const producto = await obtenerProductoXId(id);
    if(producto.error) return res.status(404).send(producto.error);
    
    res.status(200).json(producto);
};

const guardarProductoController = async (req , res) => {
    const newProduct = req.body;
    const saveProducto = await agregarProducto(newProduct);
    if(saveProducto === false) return res.status(404).send({error: 'producto no encontrado'});

    res.redirect('/');
};

const actualizarProductoController = async (req, res) => {
    const {id} = req.params;
    const newProduct = req.body;
    const result = await actualizarProducto(newProduct,id);
    if(result === false) return res.status(404).send({error: 'producto no encontrado'});

    res.json(result);
};

const eliminarProductoController = async (req, res) => {
    const {id} = req.params;
    const result = await eliminarProducto(id)
    if(result === false) return res.status(404).send({error: 'producto no encontrado'});
  
    res.json(result);
};

module.exports = {
    listarProductosController,
    listarProductoIdController,
    guardarProductoController,
    actualizarProductoController,
    eliminarProductoController,
};