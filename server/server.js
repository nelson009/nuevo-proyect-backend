const path = require('path');
const express = require('express');
const http = require('http');
const { engine } = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const passport = require('./middleware/passport');
const info = require('./router/info/info.router')
const randomNumber = require('./router/randomNumber/process.router')

const { mongodb , SESSION_SECRET, args} = require('./config/config');
const { MensajesMongoDb } = require('./models/index');
const { productosApi } = require('./controllers/productos.controllers');

const rutasApi = require('./router/app.routers');
const loginAuth = require('./router/web/login.auth');
const ErrorHandling = require('./middleware/errorHandling');

const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server);
const PORT = args.port

const mensaje = new MensajesMongoDb();
// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, './public')));
// configuro session mongo atlas
app.use(session({
    name: 'my-session',
    store: MongoStore.create({ mongoUrl: mongodb.uri
    }),
    secret: `${SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
        maxAge: 600000
    }
}));
app.use(passport.initialize());
app.use(passport.session());

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
app.use('/info', info);
app.use('/api', randomNumber);
app.use('/api', rutasApi);
app.use(loginAuth);
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