
const { obtenerIndice } = require('../../utils/funcionesUtiles/funciones');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/error/CustomError');
const ProductoDTO = require('../dtos/producto.dto');
const { v4: uuid } = require( 'uuid' ); 

class ContenedorMemoria {
    constructor(){
        this.Products = [];
    }

    findProductXId (Products,id) {
        const foundProduct = Products.find(ele => ele.id === id);
        if (!foundProduct) {
            throw new CustomError(
                STATUS.NOT_FOUND,
                `el producto con id: ${id} no existe en el registro`
            );
        }
        return foundProduct;
    }

    getProduct(){
        console.log('LISTA PRODUCTOS', this.Products)
        return this.Products;
    };

    getProductId(id){
        // const producto = this.Products.find(element => element.id === +id );
        // if (!producto) {
        //     throw new CustomError(
        //         STATUS.NOT_FOUND,
        //         `el producto con id ${id} no existe en el registro`
        //     );
        // }
        const  producto = this.findProductXId(this.Products, id);
        console.log('id producto', producto)
        return producto;
    };

    addProduct(Product){
        try {
            const id = uuid();
            const nuevoProducto = new ProductoDTO(Product,id);
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