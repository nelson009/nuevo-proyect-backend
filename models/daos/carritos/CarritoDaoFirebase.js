const ContenedorFirebase = require("../../contenedores/ContenedorFirebase");
const FieldValue = require('firebase-admin').firestore.FieldValue

const collection = "carrito"
let carritoInstance = null;

class CarritoDaoFirebase extends ContenedorFirebase {
    constructor() {
        super(collection);
        this.createCarrito();
        if(!carritoInstance){
            carritoInstance = this;
        } else {
            return carritoInstance
        }
    }

    async leerCarrito() {
        const carrito = await this.readAll()
        const result = carrito.map(doc => {
            const data = doc.data();
            return {
                id: doc.id,
                productos: data.productos,
                timestamp: data.productos
            }
        })

        return result
    }
    async createCarrito() {
        try {
            const carrito = await this.leerCarrito()
            if (carrito.length === 0) {
                await this.collection.doc().create(
                    {
                        timestamp: Date.now(),
                        productos: [],
                    }
                )
                console.log('Carrito Creado!')
            }
            const resultId = await this.leerCarrito()

            return resultId[0].id;
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteCarrito(idCarrito) {
        try {
            const carritoId = await this.leerCarrito()
            if (carritoId[0].id !== idCarrito) return { error: `El carrito con id ${idCarrito} no existe` }
            await this.collection.doc(idCarrito).delete();

            return "carrito vaciado exitosamen";

        }
        catch (error) {
            console.log(error);
        }
    }

    async getProductEnCarrito(id) {
        try {
            const carrito = await this.leerCarrito()
            if (carrito[0].id !== id) return { error: `El carrito con id ${id} no existe` };

            return carrito[0].productos;
        }
        catch (error) {
            console.log(error);
        }
    }

    async addProductAcarrito(newProduct) {
        console.log('PRODUCTO AL CARRITO', newProduct)
        try {
            const IdCarrito = await this.createCarrito()
            const result = await this.collection.doc(IdCarrito).update(
                "productos", FieldValue.arrayUnion(newProduct), { merge: true }
            )

            return result;
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteProductDeCarrito(idCart, idProduct) {
        try {
            const carrito = await this.leerCarrito()
            const findProduct = carrito[0].productos.find(ele => ele.id === idProduct)

            if (carrito[0].id !== idCart) return { error: `El carrito con id ${idCart} no existe` }
            if (findProduct === undefined) return { error: `El producto con id ${idProduct} no existe` }

            await this.collection.doc(carrito[0].id).update(
                "productos", FieldValue.arrayRemove(findProduct), { merge: true }
            )

            return console.log({ exito: 'Producto en carrito eliminado' })
        }
        catch (error) {
            console.log(error)
        }
    }

}

module.exports = CarritoDaoFirebase;