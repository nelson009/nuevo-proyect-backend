const path = require('path');
const express = require('express');
const { MemoriaApi } = require('./models/index')
const rutasApi = require('./router/app.routers');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static(path.resolve(__dirname, './public')))

// Template Engine
app.set('view engine', './views');
app.set('view engine', 'pug');

//Rutas
app.use('/api', rutasApi);

const connectedServer = app.listen( PORT, () => {
    console.log( `Servidor activo y escuchando en el puerto ${PORT}` );
});

connectedServer.on( 'error', (error) => {
    console.log(error.message);
});