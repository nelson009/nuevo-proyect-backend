const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");
let productInstance = null;

class ProductsDaoArchivo extends ContenedorArchivo {
    constructor () {
        super('productos.txt');
        if(!productInstance){
            productInstance = this;
        } else {
            return productInstance;
        }
    }
}

module.exports = ProductsDaoArchivo;