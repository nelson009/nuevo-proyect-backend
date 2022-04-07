const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");

class ProductsDaoArchivo extends ContenedorArchivo {
    constructor () {
        super('./data/persistenciaFs/productos.txt');
    }
}

module.exports = ProductsDaoArchivo;