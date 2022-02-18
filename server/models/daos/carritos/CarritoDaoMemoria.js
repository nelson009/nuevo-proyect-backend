const ContenedorMemoria = require("../../contenedores/ContenedorMemoria");


class CarritoDaoMemoria extends ContenedorMemoria {
    static contadoId = 0;
    constructor () {
        super();
        this.idCarrito = ++CarritoDaoMemoria.contadoId;
        this.carrito ;
        this.createCarrito();
    }

    async createCarrito () {
        try {
            if (!this.carrito) {
                this.carrito = {
                    id: this.idCarrito,
                    timestamp: Date.now(),
                    productos:[]
                };
                console.log('Carrito Creado')

                return  this.carrito.id
            }

            return this.carrito.id;
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteCarrito (idCarrito) {
        try {
           if(this.carrito.id !== +idCarrito) return { error: `El carrito con id ${idCarrito} no existe`}
            this.carrito = undefined

            return 'carito eliminado exitosamente'
        }
        catch (error) {
            console.log(error);
        }
    }

    async getProductEnCarrito (id) {
        try {
            if(!this.carrito.productos){
                this.createCarrito()
            }
            if( this.carrito.id !== +id) return { error: `El carrito con id ${id} no existe`};

            return this.carrito.productos
        }
        catch (error) {
            console.log(error);
        }
    }

    async addProductAcarrito (newProduct) {
        try {
            this.carrito.productos.push(newProduct)

            return newProduct
        }
        catch (error) {
            console.log(error);
        }
    }

    async deleteProductDeCarrito (idCart, idProduct) {
        try {
            const indice = this.carrito.productos.findIndex( prod => prod.id === +idProduct)
            if ( this.carrito.id  !== +idCart ) return { error: `El carrito con id ${idCart} no existe` }
            if ( indice < 0 ) return { error: `El producto con id ${idProduct} no existe` }

            this.carrito.productos.splice(indice, 1)
            return console.log({exito: 'pruducto del carrito eliminado'})
        }
        catch (error) {
            console.log(error);
        }
    }

}

module.exports = CarritoDaoMemoria;