const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');

const collection = "productos";

class ProductsDaoFirebase extends ContenedorFirebase{
    constructor () {
        super( collection );
    }
}

module.exports = ProductsDaoFirebase;