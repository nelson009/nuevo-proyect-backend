const { carrito } = require('../../models/index');

const perfilUser = async (req) => {
    if (req.user) {
        await carrito.createCarrito(req);
    }
};

module.exports = perfilUser;