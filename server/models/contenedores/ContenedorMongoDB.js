const mongoose = require('mongoose');
const { mongodb } = require('../../config/config')
const logger = require('../../logger/loggerConfig');

mongoose.connect(mongodb.uri)
console.log('Base de datos Mongo Conectado Productos');

class ContenedorMongoDb {
    constructor(collection, Schema) {
        this.model = mongoose.model(collection, Schema);
    }

    async getProduct() {
        try {
            const result = await this.model.find();
            const NewObj = result.map(ele => ({
                id: ele._id,
                nombre: ele.nombre,
                precio: ele.precio,
                foto: ele.foto,
                codigo: ele.codigo,
                stock: ele.stock,
                descripcion: ele.descripcion
            }))

            return NewObj;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async getProductId(id) {
        try {
            const document = await this.model.findById(id);

            if (document.length === 0) {

                return undefined;
            }

            return document;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async addProduct(product) {
        try {
            await this.model.create(product);
            console.log('Producto Creado exitosamente!');
        }
        catch (error) {
            logger.error(error)
        }
    }

    async updateProduct(producto, id) {
        try {
            const update = await this.model.updateOne(
                { _id: id },
                {
                    $set: {
                        nombre: producto.nombre,
                        precio: producto.precio,
                        foto: producto.foto,
                        codigo: producto.codigo,
                        descripcion: producto.descripcion,
                        stock: producto.stock
                    }
                }
            );
            console.log('Producto actualizado Exitosamente!')

            return update;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            await this.model.deleteMany({ _id: `${id}` });
            console.log(`Producto con ID: ${id} Eliminado!`);
        }
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ContenedorMongoDb;