const path = require('path');
const express = require('express');
const http = require('http');
const { engine } = require('express-handlebars')
const { MemoriaApi } = require('./models/index')
const rutasApi = require('./router/app.routers');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;
const memoria = new MemoriaApi()

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')))

// Template Engine
app.engine('handlebars', engine({
    extname: 'hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: path.resolve(__dirname, './views/layouts'),
    partialsDir: path.resolve(__dirname, './views/partials')
}))
app.set('view engine', 'handlebars');
app.set('views', './views');

//Rutas
app.use('/api', rutasApi);

io.on('connection', socket => {
    const products =  memoria.getProduct()
    console.log("IObackend", products)
    socket.emit('tableProduct',products)
   
});


const connectedServer = server.listen( PORT, () => {
    console.log( `Servidor activo y escuchando en el puerto ${PORT}` );
});

connectedServer.on( 'error', (error) => {
    console.log(error.message);
});