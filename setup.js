(async () => {
        const knex1 = require('./config/configMDB');
        const knex2 = require('./config/sqlite3');
    try {
        
        const hastable = await knex1.schema.hasTable('productos');
        const hastableMessage = await knex2.schema.hasTable('mensajes');
        if (!hastable){
            await  knex1.schema.createTable('productos', (table) => {
                table.increments("id").primary();
                table.string("nombre");
                table.float("precio");
                table.string("foto");
                table.integer("stock");
                table.integer("codigo");
                table.timestamp("timestamp");
                table.string("descripcion");
                table.string("submit");
            });
            console.log(`La tabla productos fue creada exitosamente!`); 
        }
        if(!hastableMessage) { 
            await knex2.schema.createTable('mensajes', (table) => {
                table.increments("id").primary();
                table.string("email");
                table.timestamp("fecha");
                table.string("texto");
                });
            console.log("La tabla mensajes creada exitosamente");
        }
    }
    catch (error) {
        console.log(error.message);
    }
    finally {
        knex1.destroy()
        knex2.destroy()
    }
})();
