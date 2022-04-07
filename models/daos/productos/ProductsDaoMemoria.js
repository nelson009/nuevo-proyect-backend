const ContenedorMemoria = require("../../contenedores/ContenedorMemoria");

class ProductsDaoMemoria extends ContenedorMemoria {
    constructor(){
       super() ;
    }
}

module.exports = ProductsDaoMemoria;