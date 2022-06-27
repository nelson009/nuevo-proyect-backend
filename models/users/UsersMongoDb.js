const mongoose = require('mongoose');
const { CORREO_GMAIL, configTransport } = require('../../config/config');
const { createTransport } = require('nodemailer');
const path = require("path");
const logger = require("../../logger/loggerConfig");
const ContenedorMongoDb = require('../contenedores/ContenedorMongoDB');

const transporter = createTransport(configTransport)
const enviarCorreo = async (usuario) => {
    try {
        const mailOptions = {
            from: "NodeServer",
            to: CORREO_GMAIL,
            subject: 'nuevo registro',
            html:
            `
            <h1 style="color: blue;"> informacion usuario</h1>
                <ul style="list-style: none;">
                <li>Nombre: ${usuario.firstName}</li>
                <li>Correo: ${usuario.email}</li>
                <li>Direccion: ${usuario.direccion}</li>
                <li>Edad: ${usuario.edad}</li>
                <li>Tel: ${usuario.telefono}</li>
            </ul>
            `,
            attachments: [
                {
                    path: path.resolve(__dirname, `../../public/uploads/${usuario.foto}`)
                }
            ]
        };

        const mail = await transporter.sendMail(mailOptions);
        logger.info(mail);
    }
    catch (error) {
        logger.error(error);
    }
}

const Schema = mongoose.Schema;
const collection = 'usuarios';

const userSchema = new Schema({
    firstName: { type: String, required: true },
    email: {
        type: String, required: true, unique: true,
        match: [
            /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
            "Invalid email",
        ],
    },
    password: { type: String, required: true },
    direccion: { type: String },
    edad: { type: String },
    telefono: { type: String },
    foto: { type: String },
});

class UserMongoDb extends ContenedorMongoDb {
    constructor() {
        super(collection, userSchema);
    }

    /**
     * 
     * @param {*} id id del usuario 
     * @returns usuario encontrado
     */
    async getById(id) {
        try {
            const document = await this.model.findById(id, { __v: 0 });
    
            return document;
        }
        catch (error) {
            logger.error(error);
        }
    }

    /**
     * 
     * @param {*} data email del usuario
     * @returns usuario encontrado
     */
    async getByEmail(data) {
        try {
            const document = await this.model.findOne({ email: data }, { __v: 0 })
           
            return document
        } catch (error) {
            logger.error(error);
        }
    }

    /**
     * 
     * @param {*} usuario datos del usuario que se va a crear
     * @returns usuario creado
     */
    async createUser(usuario) {
        try {
            const user = await this.model.create(usuario);
            enviarCorreo(usuario)
          
            return user
        }
        catch (error) {
            logger.error(error.message);
        }
    }
}

module.exports = UserMongoDb;
