const mongoose = require('mongoose');
const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB')

const Schema = mongoose.Schema;
const collection = 'carritos';

const carritoSchema = new Schema({
    timestamp: {type: Date, require: true},
    productos: [{
        nombre: {type: String, require: true},
        precio: {type: Number, require: true},
        foto: {type: String, require: true},
        codigo: {type: String, require: true},
        stock: {type: Number, require: true},
        timestamp: {type: Date, require: true},
        descripcion: {type: String, require: true},
        submit:{type: String}
    }]
})

class CarritosDaoMongoDb extends ContenedorMongoDB {
    constructor() {
        super(collection, carritoSchema)
    }

    async createCarrito () {
        try {
            const result = await this.model.find()
            if(!result.length < 0){
                await Carrito.create(
                    {
                        timestamp: Date.now(),
                        productos: [],
                    }
                )
                console.log('Carrito Creado');
            }
            return result[0]._id
           
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteCarrito (idCarrito) {
        try {
            const result = await this.model.find()
            if(result[0]._id !== idCarrito) return { error: `El carrito con id ${idCarrito} no existe`}
            await this.model.deleteOne( {_id: idCarrito} );

            return "carito vaciado exitosamente"
        }
        catch (error) {
            console.log(error.message);
        }
    }

    async getProductEnCarrito (id) {
        try {
            const result = await this.model.find()
            if( result[0]._id != id ) return { error: `El carrito con id ${id} no existe`};
            console.log('CARRITO GET',result[0].productos)
            return result[0].productos
        }
        catch (error) {
            console.log(error);
        }
    }

    async addProductAcarrito (newProduct) {
        try {
            const result = await this.model.find()
        
            await this.model.updateOne(
                {timestamp : result[0].timestamp },
                { $addToSet:{productos:{
                    nombre: newProduct.nombre,
                    precio:  newProduct.precio, 
                    foto: newProduct.foto, 
                    codigo: newProduct.codigo,
                    descripcion: newProduct.descripcion,
                    stock:  newProduct.stock,
                    _id: newProduct._id
                }}}
            );
            console.log('PRODUCTO AGREGADO AL CARRITO');
            return newProduct;
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteProductDeCarrito (idCart,idProduct) {
        try {
            const result = await this.model.find()
         
            if( result[0]._id != idCart ) return { error: `El carrito con id ${idCart} no existe`};
            
            const delet = await this.model.updateOne(
                { timestamp: result[0].timestamp },
                { $pull: { productos: 
                    {
                        _id: idProduct
                    }
                }}
            );
            console.log('PRODUCTO EN CARRITO ELIMINADO',delet);
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = CarritosDaoMongoDb