const {MensajesMongoDb} = require('../models/index');

class MensajeRepository {
    constructor() {
        this.mensaje = new MensajesMongoDb();
    }

    async getaAll() {
        const mensajesDB = await this.mensaje.getMessage();
        return mensajesDB;
    }
    
    async create(message) {
        const mensajesDB = await this.mensaje.addMessage(message);
        return mensajesDB;
    }
}
module.exports = MensajeRepository;
