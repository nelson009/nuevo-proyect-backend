const { obtenerIndice, generadorId } = require("../../funcionesUtiles/funciones")
const fs = require("fs");

class CarritoFs {
    static contadorId = 0;
    constructor(rutaArchivo){
        this.nombreArchivo = rutaArchivo;
        this.idCarrito = ++CarritoFs.contadorId;
    }

    async createCarrito () {
        try{
            const carritoCreate  = {
                id: this.idCarrito,
                timestamp: Date.now(),
                productos: []
            };
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(carritoCreate,null,2))

            return carritoCreate.id
        } catch (error) {
            console.log(error)
        }
    
    }
    
    async readCarrito () {
        try{
            const data = await fs.promises.readFile(this.nombreArchivo,"utf-8")
            const dataParce = JSON.parse(data)

            return dataParce
        }catch (error) {
            console.log(error)
        }
    }

    async deleteCarrito (idCarrito) {
        try{
            const data = await this.readCarrito()
            if(data.id !== +idCarrito) return { error: `El carrito con id ${idCarrito} no existe`}
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify({},null,2))

            return "carito vaciado exitosamente"
        } catch (error) {
            console.log(error.message)
        }
    }

    async getProductEnCarrito (id) {
        try {
            const data = await this.readCarrito()
            if( data.id !== +id ) return { error: `El carrito con id ${id} no existe`};

            return data.productos
        } catch (error) {
            console.log(error)
        }
    }

    async addProductAcarrito (newProduct) {
        try {
            const data = await this.readCarrito()
            data.productos.push(newProduct)
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(data,null,2))
        } catch (error) {
           console.log(error)
        }

    }

    async deleteProductDeCarrito (idCart,idProduct) {
        try {
            const data = await this.readCarrito()
            // if( data.id === +idCart ) {
                data.productos.splice(obtenerIndice(data.productos,idProduct),1)
                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(data,null,2))

                return  console.log('producto elimiado del carrito exitosamente')
            // }
        } catch (error) {
            console.log(error.message)
        }

    }
}

module.exports = CarritoFs