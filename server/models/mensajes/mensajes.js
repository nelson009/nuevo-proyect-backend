const fs = require('fs')

class Mensaje {
    constructor(){
        this.nameArchivo = './data/persistenciaFs/mensajes.txt';
    }

    async readMessage () {
        try{
            const data = await fs.promises.readFile(this.nameArchivo,"utf-8");

            return data;
        } catch (error){
            console.log(error);
        }
    };

    async addMessage(obj) {
        try{
            const messageParce = await this.getMessage();
            messageParce.push(obj);
            await fs. promises.writeFile(this.nameArchivo,JSON.stringify( messageParce,null,2));

        } catch (error){
            console.log(error.message);
        } 
    };

    async getMessage () {
        try{
           
            const productos = await this.readMessage();
            const array = JSON.parse(productos);

            return array;
        }catch (error){
            console.log(error.message);
        }
    };
 
}

module.exports = Mensaje;