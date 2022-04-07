const mongoose = require('mongoose');

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

const Carrito = mongoose.model(collection, carritoSchema);

module.exports = Carrito;