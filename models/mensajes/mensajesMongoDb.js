
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDB');
const mongoose = require('mongoose');
const { mongodb } = require('../../config/config')
const logger = require("../../logger/loggerConfig");

const { normalize, schema } = require('normalizr');


const Schema = mongoose.Schema;
const collection = 'mensajes';

const mensajesSchema = new Schema({
    author: {
        email: { type: String, require: true, max: 100, },
        nombre: { type: String, require: true, max: 100, },
        apellido: { type: String, require: true, max: 100, },
        edad: { type: Number, require: true, max: 100, },
        alias: { type: String, require: true, max: 100, },
        avatar: { type: String, require: true, max: 100, },
    },
    fecha: { type: String, require: true, },
    texto: { type: String, require: true, },
});

// mongoose.connect(mongodb.uri);
let mensajeInstance = null;

class MensajesMongoDb extends ContenedorMongoDb{
    constructor() {
        if(!mensajeInstance) {
            super(collection, mensajesSchema);
            mensajeInstance = this;
        } else {
            return mensajeInstance;
        }
    }

    /**
     * 
     * @returns mensajes normalizados
     */
    async getMessage() {
        try {
            const result = await this.model.find({}, this.proyection).lean();
            const stringMessages = JSON.stringify(result);
            const messagesParce = JSON.parse(stringMessages);
        
            const mensaje = {
                id: 'mensajes',
                messages: messagesParce
            };

            const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' });

            const mensajeSchema = new schema.Entity('post', { author: authorSchema }, { idAttribute: '_id' });

            const mensajesSchema = new schema.Entity('posts', { messages: [mensajeSchema] });

            const normalizePost = normalize(mensaje, mensajesSchema);

            return normalizePost;
        }
        catch (error) {
            logger.error(error)
        }
    }

    /**
     * 
     * @param {*} message datos del nuevo mensaje que se va incorporar
     */
    async addMessage(message) {
        try {
            await this.model.create(message);
            logger.info('Mensaje creado exitosamente')
        }
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = MensajesMongoDb;