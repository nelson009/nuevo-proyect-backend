
const {generadorId, obtenerIndice} = require('../../utils/funcionesUtiles/funciones');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/error/CustomError');
const ProductoDTO = require('../dtos/producto.dto');

class ContenedorMemoria {
    constructor(){
        this.Products = [];
    }

    findProductXId (Products,id) {
        const foundProduct = Products.find(ele => ele.id === +id);
        if (!foundProduct) {
            throw new CustomError(
                STATUS.NOT_FOUND,
                `el producto con id: ${id} no existe en el registro`
            );
        }
        return foundProduct;
    }

    getProduct(){
        
        return this.Products;
    };

    getProductId(id){
        const  producto = this.findProductXId(this.Products, id);
        return producto;
    };

    addProduct(Product){
        try {
            const nuevoProducto = new ProductoDTO(Product, generadorId(this.Products, this.Products[0]));
            this.Products.push(nuevoProducto);
            console.log('NUEVO PRODUCTO', nuevoProducto)
            return nuevoProducto;
        }
        catch(error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error creando producto',
                error,
            );
        }
    };

    updateProduct(productNuevo,id){
        try {
            this.findProductXId(this.Products, id);
            const update = new ProductoDTO({...productNuevo, timestamp: Date.now()}, id)
            const {nombre, descripcion, codigo, foto, precio, stock, timestamp} = update
            const ProductoActualizado = {
                ...this.Products[obtenerIndice(this.Products,id)],
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock,
                timestamp
            };
            this.Products[obtenerIndice(this.Products,id)] = ProductoActualizado;
            console.log('UPDATE', ProductoActualizado)
            return ProductoActualizado;
        }
        catch(error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error actualizando producto',
                error,
            );
        }
       
    };

    deleteProduct(id){
        try {
            this.findProductXId(this.Products, id);
            const deleteProducto = this.Products.splice(obtenerIndice(this.Products,id),1)
            console.log('DELETE PRODUCT', deleteProducto);
            return deleteProducto
        }
        catch(error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error eliminando producto',
                error,
            );
        }
    };

}


module.exports = ContenedorMemoria