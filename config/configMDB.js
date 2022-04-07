const kenex1 = require('knex');

const config = {
    client : 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'basededatoscoder'
    }
}

// aca lo estamos conectando con la base de datos
module.exports = kenex1(config);
