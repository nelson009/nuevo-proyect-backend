const path = require('path');
const express = require('express');

const { MemoriaApi } = require('./models/index')
const rutasApi = require('./router/app.routers');

const app = express();
const PORT = process.env.PORT || 8080;
const memoria = new MemoriaApi()

app.use(express.static(path.resolve(__dirname, './public')));
app.set('view engine', './views');
app.set('view engine', 'ejs');

//Rutas
app.use('/api', rutasApi);

const connectedServer = app.listen( PORT, () => {
    console.log( `Servidor activo y escuchando en el puerto ${PORT}` );
});

connectedServer.on( 'error', (error) => {
    console.log(error.message);
});