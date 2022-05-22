const fs = require("fs");
const ContenedorArchivo = require("../../contenedores/ContenedorArchivo");
let carritoInstance = null;

class  CarritoDaoArchivo extends ContenedorArchivo {
    static contadorId = 0;
    constructor(){
        // super( "./data/persistenciaFs/carrito.txt" )
        super( "/DB/persistenciaFs/carrito.txt" );
        this.idCarrito = ++CarritoDaoArchivo.contadorId;
        this.createCarrito()
        if(!carritoInstance){
            carritoInstance = this;
        } else {
            return carritoInstance
        }
    }

    async createCarrito () {
        const result = await this.readCarrito()
        // const result = await this.read()
        try{
            if( !result.productos ){
                const carritoCreate  = {
                    id: this.idCarrito,
                    timestamp: Date.now(),
                    productos: [],
                };
                await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(carritoCreate,null,2))
    
                return carritoCreate.id
            }
            return result.id
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
            if(!data) {
                await this.createCarrito()
            }
            if( data.id !== +id ) return { error: `El carrito con id ${id} no existe`};

            return data.productos
        } catch (error) {
            console.log(error)
        }
    }

    async addProductAcarrito (newProduct) {
        try {
            const data = await this.readCarrito()
            await data.productos.push(newProduct)
            await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(data,null,2))

            return newProduct
        } catch (error) {
           console.log(error.message)
        }

    }

    async deleteProductDeCarrito (idCart,idProduct) {
        try {
            const data = await this.readCarrito()
            const indice = data.productos.findIndex( prod => prod.id === +idProduct)
            if ( data.id  !== +idCart ) return { error: `El carrito con id ${idCart} no existe` }
            if ( indice < 0 ) return { error: `El producto con id ${idProduct} no existe` }
            data.productos.splice(indice, 1)

            return await fs.promises.writeFile(this.nombreArchivo,JSON.stringify(data,null,2))
        } catch (error) {
            console.log(error.message)
        }

    }
}

module.exports = CarritoDaoArchivo