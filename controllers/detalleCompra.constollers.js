const finalizarCompra = require('../services/carrito/detalleCompra.service')

// se envia un mensajede de los productos comprados, al correo del usuario, watsapp y devuelve un mensaje del carrito elimando exitosamente o error de session 
const detalleCompraController = async (req, res) => {
    const result = await finalizarCompra(req);
    if(result === false) return res.status(404).json('sesion expirada');

    return res.status(200).json( result );
};

module.exports = detalleCompraController;

