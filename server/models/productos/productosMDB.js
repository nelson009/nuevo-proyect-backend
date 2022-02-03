const knex = require('knex')

class ProductosMDB {
    constructor (tableName, config) {
        this.tableName = tableName;
        this.knex = knex(config);
    }

    async getProduct () {
        try{
            const result = await this.knex(this.tableName).select('*');

            return result;
        } 
        catch (error) {
            console.log(error.message);
        }
    };

    async getProductId (id) {
        try{
            const result = await  this.knex.from(this.tableName)
            .select('*')
            .where('id', id)
            
            if( result.length === 0 ) {

                return undefined;
            }

            return result;
        } 
        catch (error) {
            console.log(error.message);
        }
    };

    async addProduct (product) {
        try {
            await this.knex(this.tableName).insert(product);
            console.log('producto insertado exitosamente')
        }
        catch (error) {
            console.log(error.message);
        }
    };

    async updateProduct (productoNuevo, id) {
        try{
            await  this.knex.from(this.tableName).where('id', id)
            .update('nombre', productoNuevo.nombre)
            .update('descripcion', productoNuevo.descripcion)
            .update('codigo', productoNuevo.codigo)
            .update('precio', productoNuevo.precio)
            .update('foto', productoNuevo.foto)
            .update('stock', productoNuevo.stock)
            console.log('El producto se actualizo exitosamente')
        } 
        catch (error) {
            console.log(error.message);
        }
    };

    async deleteProduct (id) {
        try{
            await this.knex(this.tableName).where('id', id).delete();
            console.log('El producto fue eliminado exitosamente');
        }
        catch (error) {
            console.log(error.message);
        }
    };
}

module.exports = ProductosMDB;