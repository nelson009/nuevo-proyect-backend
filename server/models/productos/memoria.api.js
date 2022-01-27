const {generadorId, obtenerIndice} = require('../../funcionesUtiles/funciones')
class MemoriaApi {
    constructor(){
        this.Products = [];
    }

    getProduct(){
        
        return this.Products;
    };

    getProductId(id){
        const producto = this.Products.find(element => element.id === +id );

        return producto;
    };

    addProduct(Product){
        const nuevoProducto = ({...Product, id : generadorId( this.Products, this.Products[0]),timestamp: Date.now()});
        this.Products.push(nuevoProducto);

        return nuevoProducto;
    };

    updateProduct(productNuevo,id){
        const {nombre, descripcion, codigo, foto, precio, stock} = productNuevo
        const ProductoActualizado = {
            ...this.Products[obtenerIndice(this.Products,id)],
            nombre,
            descripcion,
            codigo,
            foto,
            precio,
            stock
        };
        this.Products[obtenerIndice(this.Products,id)] = ProductoActualizado;

        return ProductoActualizado;
    };

    deleteProduct(id){
        this.Products.splice(obtenerIndice(this.Products,id),1)
    }

}


module.exports = MemoriaApi