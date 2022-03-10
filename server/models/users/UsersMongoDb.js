const mongoose = require('mongoose');
const {mongodb} = require('../../config/config');

const Schema = mongoose.Schema;
const collection = 'usuarios';

const userSchema = new Schema({
    firstName: { type: String, required: true },
    email: {
        type: String,required: true,unique: true,
        match: [
          /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
          "Invalid email",
        ],
    },
    password: { type: String, required: true },
});

mongoose.connect(mongodb.uri);

class UserMongoDb  {
    constructor() {
        this.model = mongoose.model(collection, userSchema);
    }

    async getAll (filter = {}) {
        try {
            const document = await this.model.find(filter,{__v:0});
           
            return document;
        }
        catch (error) {
            console.log(error);
        }
    }

    async getById (id) {
        try {
            const document = await this.model.findById( id, { __v: 0 } );

            return document;
        }
        catch (error) {
            console.log(error);
        }
    }

    async getByEmail(data) {
        try{
            const document = await this.model.findOne({email: data }, { __v: 0 })

            return document
        } catch (error) {
            console.log(error);
        }
    }

    async createUser (usuario) {
        try {
            const user = await this.model.create(usuario);

            return user
        }
        catch (error) {
            console.log(error.message);
        }
    }
}

module.exports = UserMongoDb;