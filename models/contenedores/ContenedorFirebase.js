const admin = require('firebase-admin');
const { FirebaseCredencial } = require('../../config/config')
const logger = require('../../logger/loggerConfig');

admin.initializeApp(FirebaseCredencial)

class ContenedorFirebase {
    constructor(name) {
        this.collection = admin.firestore().collection(`${name}`);
    }

    async readAll() {
        const querySnapshot = await this.collection.get();
        const result = querySnapshot.docs

        return result
    }
    async getProduct() {
        try {
            const productos = await this.readAll()
            const result = productos.map(doc => {
                const data = doc.data();
                return {
                    id: doc.id,
                    nombre: data.nombre,
                    precio: data.precio,
                    foto: data.foto,
                    codigo: data.codigo,
                    stock: data.stock,
                    timestamp: data.timestamp,
                    descripcion: data.descripcion,
                }
            });
            console.log("GETPRODUCT", result)

            return result;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async getProductId(id) {
        try {

            const document = await this.collection.doc(id).get();
            const result = document.data();
            if (result === undefined) return undefined

            return { ...result, id: id };
        }
        catch (error) {
            logger.error(error)
        }

    }

    async addProduct(product) {
        try {
            await this.collection.doc().create({ ...product, timestamp: Date.now() });
            console.log('Producto insertado');

            return product;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async updateProduct(producto, id) {
        try {
            const UpdateProduct = await this.collection.doc(id)
                .update(
                    {
                        nombre: producto.nombre,
                        precio: producto.precio,
                        foto: producto.foto,
                        codigo: producto.codigo,
                        stock: producto.stock,
                        descripcion: producto.descripcion,
                    }
                );
            console.log('Producto Actualizado');

            return UpdateProduct;
        }
        catch (error) {
            logger.error(error)
        }
    }

    async deleteProduct(id) {
        try {
            const deleteProduct = await this.collection.doc(id).delete();
            console.log('Producto eliminado Exitosamente', deleteProduct);
        }
        catch (error) {
            logger.error(error)
        }
    }
}

module.exports = ContenedorFirebase