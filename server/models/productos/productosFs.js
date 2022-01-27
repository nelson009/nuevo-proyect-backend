const fs = require('fs');
const { obtenerIndice, generadorId } = require('../../funcionesUtiles/funciones');

class ProductosFs {
    constructor(){
        this.nombreArchivo = "./data/persistenciaFs/productos.txt";
    }

    async getProduct () {
        try{
            const data = await fs.promises.readFile(this.nombreArchivo,"utf-8")
            const dataParce = JSON.parse(data)

            return dataParce
        }catch (error) {
            console.log(error)
        }
    }

    async getProductId (id) {
        try {
            const data = await this.getProduct()
            const idProduct = data.find( ele => ele.id === +id)
    
            return idProduct
        } catch (error) {
            console.log(error.message)
        }
    }

    async addProduct (product) {
        try{
            const data = await this.getProduct()
            const nuevoProducto = ({...product,id: generadorId(data,data[0]),timestamp: Date.now() })
            data.push(nuevoProducto)
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify( data,null,2))
        } catch (error) {
            console.log(error)
        }
    }

    async updateProduct (productoNuevo,id) {
        try {
            const { nombre, descripcion, codigo, foto, precio, stock } = productoNuevo;
            const data = await this.getProduct()

            const ProductoActualizado = {
                ...data[obtenerIndice(data,id)],
                nombre,
                descripcion,
                codigo,
                foto,
                precio,
                stock
            }
            data[obtenerIndice(data,id)] = ProductoActualizado
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify( data,null,2))

            return ProductoActualizado    
        } catch (error) {
            console.log(error.message)
        }
    }

    async deleteProduct (id) {
        try{
            const data = await this.getProduct()
            data.splice(obtenerIndice(data,id),1)
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(data,null,2))
        } catch (error) {
            console.log(error)
        }
       
    }

}

module.exports = ProductosFs