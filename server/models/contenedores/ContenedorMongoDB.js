const mongoose = require('mongoose');
const {mongodb} = require('../../config/config')

mongoose.connect(mongodb.uri)
console.log('Base de datos Mongo Conectado Productos');

class ContenedorMongoDb {
    constructor(collection, Schema) {
        this.model = mongoose.model(collection, Schema);
    }
    
    async getProduct () {
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
            console.log(error.message);
        }
    }

    async getProductId (id) {
        try {
            const document = await this.model.findById( id );

            if( document.length === 0 ) {

                return undefined;
            }
            
            return document;
        }
        catch (error) {
            console.log(error);
        }
    }

    async addProduct (product) {
        try{
            await this.model.create(product);
            console.log('Producto Creado exitosamente!');
        }
        catch (error) {
            console.log(error.message);
        }
    }

    async updateProduct (producto,id) {
        try{
            const update = await this.model.updateOne(
                { _id: id },
                { $set: {
                    nombre: producto.nombre,
                    precio:  producto.precio, 
                    foto: producto.foto, 
                    codigo: producto.codigo,
                    descripcion: producto.descripcion,
                    stock:  producto.stock
                }}
            );
            console.log('Producto actualizado Exitosamente!')

            return update;
        }
        catch (error) {
            console.log(error.message);
        }
    }

    async deleteProduct (id) {
        try {
            await this.model.deleteMany({ _id: `${id}`});
            console.log(`Producto con ID: ${id} Eliminado!`);
        }
        catch (error) {
            console.log(error);
        }
    }
}

module.exports = ContenedorMongoDb;