
const express = require('express');
const Contenedor = require('./desafiofs');


const app = express()
const PORT = process.env.PORT || 8080;

const contenedor = new  Contenedor('./productos.txt')
const numeroAleatorio = (min, max) => Math.floor(min + Math.random() * (max - min + 1))

app.get('/productos', async (req,res) => {
    res.send( await contenedor.getAll())

})

app.get('/productoRandom', async(req,res) => {
    const arrayProduct =  await contenedor.getAll()
    
    res.send( arrayProduct[numeroAleatorio(0,2)])
})

const connectedServer = app.listen(PORT, () => {
    console.log(`Servidor activo y escuchando en el puerto ${PORT}`)
})

connectedServer.on('error', (error) =>{
    console.log(error.message)
})



