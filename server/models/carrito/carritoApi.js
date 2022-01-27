const { obtenerIndice, generadorId } = require("../../funcionesUtiles/funciones")
class Carrito {
    constructor(){
        this.carrito;
    }

    // createCarrito (obj) {
    //     const id = generadorId(this.carrito,this.carrito[0])
    //     const carrito = ({id: id,timestamp: Date.now(), ...obj})
    //     this.carrito.push(carrito)

    //     return id
    // }
    
    createCarrito () {
        // const id = generadorId(this.carrito,this.carrito[0])
        this.carrito  = {
            id: 1,
            timestamp: Date.now(),
            productos: []
        };
        // this.carrito = carrito
        console.log("carrito creado", this.carrito)
        return this.carrito
    }

    // deleteCarrito (id) {
    //     this.carrito.splice(obtenerIndice(this.carrito,id), 1);

    //     return console.log('carrito elimiado exitosamente',this.carrito)
    // }

    deleteCarrito (idCarrito) {
        // this.carrito.splice(obtenerIndice(this.carrito,id), 1);
        if(this.carrito.id === +idCarrito){
            this.carrito = {}   
            return console.log('carrito elimiado exitosamente', this.carrito)
        }  
    }


    // getProductEnCarrito (id) {

    //    return this.carrito[obtenerIndice(this.carrito,id)].productos
    // }

    async getProductEnCarrito (id) {
       
        if(this.carrito.id === +id){
            console.log("lista de cart", this.carrito)
            
            return this.carrito.productos
        }
     }

    // addProductAcarrito (newProduct) {
    //     const carrito = ({
    //         id: generadorId(this.carrito[0].productos,this.carrito[0].productos[0]),
    //         timestamp: Date.now(),
    //          ...newProduct
    //         })
    //     this.carrito[0].productos.push(carrito)

    // }

    async addProductAcarrito (newProduct) {
       
        this.carrito.productos.push(newProduct)
        console.log("producto agregado al carrito", this.carrito)

    }

    // deleteProductDeCarrito (idCart,idProduct) {
    //     const listaProduct = this.getProductEnCarrito(idCart)
    //     listaProduct.splice(obtenerIndice(listaProduct,idProduct),1)

    //     return  console.log('producto elimiado del carrito exitosamente',this.carrito)
    // }

    deleteProductDeCarrito (idCart,idProduct) {
    
       
        if(this.carrito.id === +idCart) {

            this.carrito.productos.splice(obtenerIndice(this.carrito.productos,idProduct),1)
        }
        
    }
}

module.exports = Carrito