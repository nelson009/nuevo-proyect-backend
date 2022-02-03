const  knex2  = require("knex")

const configSqlite3 = {
    client: 'sqlite3',
    connection: {
        filename: './DB/ecommerce.sqlite'
    },
    useNullAsDefault: true
}

module.exports = knex2(configSqlite3)