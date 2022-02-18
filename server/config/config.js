
const admin = require('firebase-admin');
const  serviceAccount = require('../DB/coder.json')

module.exports = {
    mongodb: {
        uri: `mongodb+srv://nelson:${process.env.DB_PASSWORD}@cluster0.2vdgf.mongodb.net/ecommerce2?retryWrites=true&w=majority`
    },
    FirebaseCredencial:{
        credential: admin.credential.cert(serviceAccount)
    },
    sqlite3Mensajes: {
        client: 'sqlite3',
        connection: {
        filename: './DB/ecommerce.sqlite'
        },
        useNullAsDefault: true
    }
}