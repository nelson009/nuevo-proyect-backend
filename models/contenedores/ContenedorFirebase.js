const admin = require('firebase-admin');
const { FirebaseCredencial } = require('../../config/config')
const logger = require('../../logger/loggerConfig');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/error/CustomError');
const ProductoDTO = require('../dtos/producto.dto');

admin.initializeApp(FirebaseCredencial)

class ContenedorFirebase {
    constructor(name) {
        this.collection = admin.firestore().collection(`${name}`);
    }

    async readAll() {
        const querySnapshot = await this.collection.get();
        const result = querySnapshot.docs;

        return result;
    }

    
    async verificarExistenciaProduct(id) {
        const document = await this.collection.doc(id).get();
        const result = document.data();
        if(!result){
            throw new CustomError(
                STATUS.NOT_FOUND,
                `el producto con id: ${id} no existe en el registro`
            );
        }
        return result;
    }

    async getProduct() {
        try {
            const productos = await this.readAll();
            const result = productos.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    nombre: data.nombre,
                    precio: data.precio,
                    foto: data.foto,
                    codigo: data.codigo,
                    stock: data.stock,
                    timestamp: data.timestamp,
                    descripcion: data.descripcion,
                }
            });

            return result;
        }
        catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error buscando productos',
                error,
            );
        }
    }

    async getProductId(id) {
        try {
            const result = await this.verificarExistenciaProduct(id);
            return { ...result, id: id };
        }
        catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                `Error buscando producto por ${id}`,
                error,
            );
        }

    }

    async addProduct(product) {
        try {
            const newProduct = new ProductoDTO(product);
            await this.collection.doc().create({...newProduct});
            logger.info('Producto insertado');

            return newProduct;
        }
        catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error creando producto',
                error,
            );
        }
    }

    async updateProduct(producto, id) {
        try {
            await this.verificarExistenciaProduct(id);
            const newProduct = new ProductoDTO(producto);
            await this.collection.doc(id).update({...newProduct});
            logger.info('Producto Actualizado');

            return newProduct;
        }
        catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error actualizando producto',
                error,
            );
        }
    }

    async deleteProduct(id) {
        try {
            await this.verificarExistenciaProduct(id);
            const deleteProduct = new ProductoDTO({},id);
            await this.collection.doc(id).delete();
            logger.info('Producto eliminado Exitosamente');
            return deleteProduct;
        }
        catch (error) {
            throw new CustomError(
                STATUS.INTERNAL_ERROR,
                'Error eliminando producto',
                error,
            );
        }
    }
}

module.exports = ContenedorFirebase;