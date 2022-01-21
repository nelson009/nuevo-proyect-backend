const fs = require('fs/promises')

class Mensaje {
    constructor(){
        this.Mensaje = [];
        this.nameArchivo = './persistenciaFs/mensajes.txt'
    }

    async readMessage () {
        try{
            const data = await fs.readFile(this.nameArchivo,"utf-8")

            return data
        } catch (error){
            console.log(error)
        }
    }

    async addMessage(obj) {
        try{
            // const messageParce = await this.getMessage()
            // messageParce.push(obj)
            // await fs.writeFile(this.nameArchivo,JSON.stringify( messageParce,null,2));

            this.Mensaje.push(obj)
            await fs.writeFile(this.nameArchivo,JSON.stringify( this.Mensaje,null,2));
         
        } catch (error){
            console.log(error.message)
        } 
    }

    async getMessage () {
        try{
           
            const productos = await this.readMessage();
            const array = JSON.parse(productos)

            return array
        }catch (error){
            console.log(error.message)
        }
    }
 
}

module.exports = Mensaje