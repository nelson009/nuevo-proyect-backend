const mongoose = require('mongoose');

const Schema = mongoose.Schema;
// const collection = 'productos';

const productoSchema = new Schema({
    nombre:{
        type: String,
        require: true,
    },
    precio:{
        type: Number,
        require: true,
    },
    foto:{
        type: String,
        require: true,
    },
    codigo:{
        type: String,
        require: true,
    },
    stock:{
        type: Number,
        require: true,
    },
    timestamp:{
        type: String,
        require: true,
    },
    descripcion:{
        type: String,
        require: true,
    },
    submit:{
        type: String,
    }
});

// const Producto = mongoose.model(collection, productoSchema);

// module.exports = Producto;
module.exports = productoSchema;