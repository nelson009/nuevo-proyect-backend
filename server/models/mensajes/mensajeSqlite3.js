const knex = require('knex');

class MensajeSqlite3 {
    constructor (tableName, config) {
        this.tableName = tableName;
        this.knex = knex(config);
    }

    async getMessage () {
        try{
            const result = await this.knex(this.tableName).select('*');
            
            return result;
        }
        catch (error) {
            console.log(error.message);
        }
    };

    async addMessage (message) {
        try{
            await this.knex(this.tableName).insert(message);
            console.log('mensaje insertado exitosamente');
        }
        catch (error) {
            console.log(error.message)
        }
    };
}

module.exports= MensajeSqlite3;