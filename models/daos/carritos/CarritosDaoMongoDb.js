const mongoose = require('mongoose');
const ContenedorMongoDB = require('../../contenedores/ContenedorMongoDB');
const logger = require('../../../logger/loggerConfig');

const Schema = mongoose.Schema;
const collection = 'carritos';
let carritoInstance = null;

const carritoSchema = new Schema({
    usuario: { type: String, require: true },
    timestamp: { type: Date, require: true },
    productos: [{
        nombre: { type: String, require: true },
        precio: { type: Number, require: true },
        foto: { type: String, require: true },
        codigo: { type: String, require: true },
        stock: { type: Number, require: true },
        timestamp: { type: Date, require: true },
        descripcion: { type: String, require: true },
        cantidad: { type: Number, },
        submit: { type: String }
    }]
})

class CarritosDaoMongoDb extends ContenedorMongoDB {
    constructor() {
        if(!carritoInstance){
            super(collection, carritoSchema);
            carritoInstance = this;
        } else {
            return carritoInstance
        }
    }

    async createCarrito(req) {
        try {
            const result = await this.filterCarrito(req);
            logger.info( result)
            if (result === null) {
                await this.model.create(
                    {
                        usuario: req.user.email,
                        timestamp: Date.now(),
                        productos: [],
                    }
                )
                logger.info('Carrito Creado');
            }
            const result2 = await this.filterCarrito(req)

            return result2._id;

        }
        catch (error) {
            logger.error(error);
        }
    }

    async deleteCarrito(idCarrito,req) {
        try {
            
            const result = await this.filterCarrito(req);
            logger.info(result)
            if (result._id.toString() !== idCarrito) return { error: `El carrito con id ${idCarrito} no existe` }
            await this.model.deleteOne({ _id: idCarrito });

            return "carito vaciado exitosamente"
        }
        catch (error) {
            logger.error(error);
        }
    }

    async getProductEnCarrito(id, req) {
        try {
            const result = await this.filterCarrito(req);
            if (result._id.toString() !== id) return { error: `El carrito con id ${id} no existe` };
            
            const newObj = result.productos.map(ele => ({
                id: ele._id,
                nombre: ele.nombre,
                precio: ele.precio,
                foto: ele.foto,
                codigo: ele.codigo,
                stock: ele.stock,
                descripcion: ele.descripcion,
                cantidad: ele.cantidad
            }))
            logger.info(newObj)
            return newObj
        }
        catch (error) {
            logger.error(error);
        }
    }

    async addProductAcarrito(newProduct,req) {
        try {
            const cantidad = req.body;
            const result = await this.filterCarrito(req);
            const findProduct = result.productos.find((ele)=> ele._id.toString() === newProduct._id.toString())
            
            if(findProduct) {
                result.productos.id(newProduct._id).cantidad= +cantidad.unidad

                return await result.save()
            }

            await this.model.updateOne(
                { usuario: result.usuario },
                {
                    $addToSet: {
                        productos: {
                            nombre: newProduct.nombre,
                            precio: newProduct.precio,
                            foto: newProduct.foto,
                            codigo: newProduct.codigo,
                            descripcion: newProduct.descripcion,
                            stock: newProduct.stock,
                            _id: newProduct._id,
                            cantidad: +cantidad.unidad,
                        }
                    }
                }
            );
            logger.info('PRODUCTO AGREGADO AL CARRITO');

            return newProduct;
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteProductDeCarrito(idCart, idProduct, req) {
        try {
            const result = await this.filterCarrito(req);
            const findProduct = result.productos.find(ele => ele.id === idProduct)

            if (result._id.toString() !== idCart) return { error: `El carrito con id ${idCart} no existe` };
            if (findProduct === undefined) return { error: `El producto con id ${idProduct} no existe` }

            const delet = await this.model.updateOne(
                { timestamp: result.timestamp },
                {
                    $pull: {
                        productos:
                        {
                            _id: idProduct
                        }
                    }
                }
            );
            logger.info('PRODUCTO EN CARRITO ELIMINADO', delet);
        }
        catch (error) {
            logger.error(error);
        }
    }
}

module.exports = CarritosDaoMongoDb