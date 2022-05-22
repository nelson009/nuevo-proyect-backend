const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");
let productInstance = null;

class ProductsDaoArchivo extends ContenedorArchivo {
    constructor () {
        // super('./DB/persistenciaFs/productos.txt');
        super('/DB/persistenciaFs/productos.txt');
        if(!productInstance){
            productInstance = this;
        } else {
            return productInstance;
        }
        // esto me entrega la ruta de este script
        // this.path = process.cwd() + `/DB`
    }
}

module.exports = ProductsDaoArchivo;