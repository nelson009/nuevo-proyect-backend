const mongoose = require('mongoose');
const { mongodb } = require('../../config/config');
const MongoDBClient = require('../../DB/mongo/MongoDBClient');
const logger = require('../../logger/loggerConfig');


///en esta clase estaria la logica generica dependiendo de la fuente de datos . En este caso mongo
let contMongoInstance = null;
class ContenedorMongoDb {
    constructor(collection, Schema) {
        this.proyection = mongodb.projection;
        this.model = mongoose.model(collection, Schema);
        if(!contMongoInstance){
            this.client = new MongoDBClient(mongodb.uri);
            contMongoInstance = this.client.connect();
        } else {
            return
        }
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
                descripcion: ele.descripcion
            }))
            console.log('GET PRODUCTS', result)
            return NewObj;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async getProductId(id) {
        try {
            const document = await this.model.findById(id, this.proyection).lean();

            // if (document.length === 0) {

            //     return undefined;
            // }

            return document;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async addProduct(product) {
        try {
            const add = (await this.model.create(product)).doc;
            logger.info('Producto Creado exitosamente!');
            console.log('AGREGAR', add)
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
            logger.info('Producto actualizado Exitosamente!')

            return update;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            await this.model.deleteMany({ _id: `${id}` });
            logger.info(`Producto con ID: ${id} Eliminado!`);
        }
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ContenedorMongoDb;