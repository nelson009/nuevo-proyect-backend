const ContenedorMemoria = require("../../contenedores/ContenedorMemoria");
let productInstance = null;

class ProductsDaoMemoria extends ContenedorMemoria {
    constructor(){
       super() ;
       if(!productInstance){
        productInstance = this;
        } else {
            return productInstance;
        }
    }
}

module.exports = ProductsDaoMemoria;