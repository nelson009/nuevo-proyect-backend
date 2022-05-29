const mongoose = require('mongoose');
const { mongodb } = require('../../config/config');
const MongoDBClient = require('../../DB/mongo/MongoDBClient');
const logger = require('../../logger/loggerConfig');
const { STATUS } = require('../../utils/constants/api.constants');
const CustomError = require('../../utils/error/CustomError');
const ProductoDTO = require('../dtos/producto.dto');

///en esta clase estaria la logica generica dependiendo de la fuente de datos . En este caso mongo
let contMongoInstance = null;
class ContenedorMongoDb {
    constructor(collection, Schema) {
        this.proyection = mongodb.projection;
        this.model = mongoose.model(collection, Schema);
        if(!contMongoInstance){
            logger.info('conectandose base de datos...')
            this.client = new MongoDBClient(mongodb.uri);
            contMongoInstance = this.client.connect();
        }
    }

    // async getAll (filter = {}) {
    //     const result = await this.model.find(filter, this.proyection).lean();
    //     return result;
    // }

    async verificarExistenciaProduct(id) {
        const document = await this.model.findById(id, this.proyection).lean();
        if (!document) {
            throw new CustomError(
                STATUS.NOT_FOUND,
                `el producto con id: ${id} no existe en el registro`
            );
        }
        return document;
    }

    async filterCarrito(req) {
        try{
            const { user } = req;
            const email = user.email
            const document = await this.model.findOne({ usuario: email }, this.proyection );

            return document;
        }
        catch (error) {
            logger.error(error);
        }
    }

    async getProduct(filter = {}) {
        try {
            const result = await this.model.find(filter, this.proyection).lean();
            const NewObj = result.map(ele => ({
                id: ele._id,
                nombre: ele.nombre,
                precio: ele.precio,
                foto: ele.foto,
                codigo: ele.codigo,
                stock: ele.stock,
                descripcion: ele.descripcion,
                timestamp: ele.timestamp
            }))
            
            return NewObj;
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
            // const document = await this.model.findById(id, this.proyection).lean();
            // if (!document) {
            //     throw new CustomError(
            //         STATUS.NOT_FOUND,
            //         `el producto con id: ${id} no existe en el registro`
            //     );
            // }
            const document = await this.verificarExistenciaProduct(id)

            return document;
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
            const newProduct = new ProductoDTO(product)
            await this.model.create(newProduct);
            logger.info('Producto Creado exitosamente!');

            return newProduct
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
            const updateProduct = new ProductoDTO({...producto, timestamp: Date.now()},null)
            await this.model.updateOne({ _id: id }, {$set: updateProduct});
            logger.info('Producto actualizado Exitosamente!')
          
            return updateProduct;
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
            await this.model.deleteMany({ _id: id });
            logger.info(`Producto con ID: ${id} Eliminado!`);
    
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

module.exports = ContenedorMongoDb;