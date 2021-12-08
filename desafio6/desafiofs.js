const fs = require('fs/promises')

class Contenedor {
    constructor(nombreArchivo){
        this.nombreArchivo = nombreArchivo
        this.productoId = []
        this.deleteId = []
        this.delete = []
    }

    async read () {
        try{
            const data = await fs.readFile(this.nombreArchivo,"utf-8")

            return data
        } catch (error){
            console.log(error.message)
        }
    }

    async save(obj){
        try{
            const producto = await this.read()
            const productoParce = JSON.parse(producto)
            const id = productoParce.reduce((idmax, producto) => idmax.id > producto.id ? idmax +1: producto.id +1, productoParce[0])
            productoParce.push({...obj,id:id == undefined? 1 : id})
            await fs.writeFile(this.nombreArchivo,JSON.stringify(productoParce,null,2));
           
            return console.log(id == undefined? 1 : id)
        } catch (error){
            console.log(error)
        } 
    }

    async getById(id){
        try{
            const productos = await this.read();
            this.productoId  = JSON.parse(productos);
            const idProduct =this.productoId.find(element => element.id == id? element : null)
            console.log(idProduct)
            return idProduct
        } catch (error){
           console.log(error.message)
        }

    }
    async getAll(){
        try{
            const productos = await this.read();
            const array = JSON.parse(productos)
            // console.log(array)
            return array
        }catch (error){
            console.log(error.message)
        }
    }

    async deleteById(id) {
        try{
            const productos = await this.read();
            const productoParse = JSON.parse(productos)
            this.deleteId = productoParse.filter( element => element.id !== id)
            await fs.writeFile(this.nombreArchivo,JSON.stringify(this.deleteId,null,2));
            console.log('Producto elimnado por Id')
        }catch (error){
            console.log(error.message)
        }
    }

    async deleteAll() {
        try{
            await fs.writeFile(this.nombreArchivo,JSON.stringify(this.delete,null,2))
            console.log('Todos los productos fueron Eliminados')
        }catch(error){
            console.log(error.message)
        }
    }
}

// const contenedor = new  Contenedor('./productos.txt')

//  contenedor.save({title:'samsung 3', price: 3, thumbnail:"https://images.fravega.com/s250/c85140313a6c3e17f406cb82311a756a.jpg.webp"})
// contenedor.getById(2)
// contenedor.getAll()
// contenedor.deleteById(3)
// contenedor.deleteAll()

module.exports = Contenedor