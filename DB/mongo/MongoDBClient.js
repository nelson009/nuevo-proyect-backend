const DBClient = require("../DBClient");
const mongoose = require('mongoose');
const logger= require('../../logger/loggerConfig')

///DBClient para asegurarnos que todos los clientes que vamos a instanciar (base de datos)tengan un estructura,interfas igual

class MongoDBClient extends DBClient {
    constructor(uri) {
        super()
        this.connected = false;
        this.uri = uri;
        this.client = mongoose;
    }
    //aplicamos la logica del cliente
    async connect() {
        try {
            if(!this.connected) {
                await this.client.connect(this.uri);
                this.connected = true;
                logger.info('Base de datos conectada');
            }
        }
        catch(error) {
            logger.error(error);
            throw new error('Error conectando la base de datos!');
        }
    };

    async disconnect() {
        try {
            if(this.connect){
                await this.client.connection.close();
                this.connect = false;
                logger.info('Base de datos desconectada');
            }
        }
        catch(error) {
            logger.error(error);
            throw new error('Error desconectando la base de datos!');
        }
    };
};

module.exports = MongoDBClient;