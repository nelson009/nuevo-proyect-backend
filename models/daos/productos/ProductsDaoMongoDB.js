const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const collection = 'productos';

// const productoSchema = new Schema({
//     nombre: {type: String,require: true,},
//     precio: {type: Number,require: true,},
//     foto: {type: String,require: true,},
//     codigo: {type: String,require: true,},
//     stock: {type: Number,require: true,},
//     timestamp: {type: String,require: true,},
//     descripcion: {type: String,require: true,},
//     submit: {type: String,}
// });

const productoSchema = new Schema({
    nombre: {type: String,require: true,},
    precio: {type: Number,require: true,},
    foto: {type: String,require: true,},
    codigo: {type: Number,require: true,},
    stock: {type: Number,require: true,},
    // timestamp: {type: Date, default: Date.now(),require: true,},
    timestamp: {type: Date,require: true,},
    descripcion: {type: String,require: true,},
    submit: {type: String,}
});

let productInstance = null;
//super EJECUTA EL CONSTRUCTOR DE LA CLASE PADRE
class ProductsDaoMongoDb extends ContenedorMongoDB {
    constructor () {
        if(!productInstance){
            super(collection, productoSchema);
            productInstance = this;
        } else {
            return productInstance;
        }
    }
    get data() {
        return this._data;
    }
};

module.exports = ProductsDaoMongoDb;

