const finalizarCompra = require('../services/carrito/detalleCompra.service')

const detalleCompraController = async (req, res) => {
    const result = await finalizarCompra(req);
    if(result === false) return res.status(200).json('sesion expirada del usuario');

    return res.status(200).json( result );
};

module.exports = detalleCompraController;

