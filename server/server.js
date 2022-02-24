const path = require('path');
const express = require('express');
const http = require('http');
const { engine } = require('express-handlebars');
const { productosApi } = require('./controllers/productos.controllers')
const { MensajesMongoDb } = require('./models/index');
const rutasApi = require('./router/app.routers');
const ErrorHandling = require('./middleware/errorHandling')

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 8080;

const mensaje = new MensajesMongoDb();

// Middlewares
app.use(express.static(path.resolve(__dirname, './public')));

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
app.use('*', ErrorHandling);

io.on('connection', async socket => {
    console.log('connection');
    io.sockets.emit('tableProduct', await productosApi.getProduct());
    io.sockets.emit("chat", await mensaje.getMessage());

    socket.on("messageFront",async data => {
        data.fecha = new Date().toLocaleString("es-AR", "DD-M-YYYY HH:MM:SS")
        await mensaje.addMessage(data);
        io.sockets.emit("chat",await mensaje.getMessage());
    })
   
});

const connectedServer = server.listen( PORT, () => {
    console.log( `Servidor activo y escuchando en el puerto ${PORT}` );
});

connectedServer.on( 'error', (error) => {
    console.log(error.message);
});