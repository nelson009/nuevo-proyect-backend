const ContenedorFirebase = require('../../contenedores/ContenedorFirebase');

const collection = "productos";
let productInstance = null;

class ProductsDaoFirebase extends ContenedorFirebase{
    constructor () {
        super( collection );
        if(!productInstance){
            productInstance = this;
        } else {
            return productInstance;
        }
    }
}

module.exports = ProductsDaoFirebase;