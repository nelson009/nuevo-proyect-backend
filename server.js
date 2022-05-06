const path = require("path");
const express = require("express");
const peticionServerInfo = require('./middleware/logger.info');
const http = require("http");
const hbs = require("hbs");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("./middleware/passport");
const cluster = require("cluster");
const logger = require("./logger/loggerConfig");

// const { mongodb, SESSION_SECRET, args } = require("./config/config");
const { mongodb, SESSION_SECRET, MODE_CLUSTER } = require("./config/config");
const { MensajesMongoDb } = require("./models/index");
const { obtenerProductos } = require("./services/productos/productos.service");

const rutasApi = require("./router/app.routers");
const ErrorHandling = require("./middleware/errorHandling");

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server);
// const PORT = args.port

const mensaje = new MensajesMongoDb();
// const modoCluster = args.server === "CLUSTER";
const modoCluster = MODE_CLUSTER.toUpperCase() === "CLUSTER";
// const modoCluster =process.argv[3] === "CLUSTER";

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, "./public")));
// configuro session mongo atlas
app.use(
  session({
    name: "my-session",
    store: MongoStore.create({ mongoUrl: mongodb.uri }),
    secret: `${SESSION_SECRET}`,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
      maxAge: 600000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Template Engine
hbs.registerPartials(__dirname + "/views/partials", function (err) { });
app.set("view engine", "hbs");
app.set("views", __dirname + "/views");

//Rutas
app.use(peticionServerInfo)
app.use(rutasApi);
app.use("*", ErrorHandling);

io.on("connection", async (socket) => {
  console.log("connection");
  io.sockets.emit("tableProduct", await obtenerProductos());
  io.sockets.emit("chat", await mensaje.getMessage());

  socket.on("messageFront", async (data) => {
    data.fecha = new Date().toLocaleString("es-AR", "DD-M-YYYY HH:MM:SS");
    await mensaje.addMessage(data);
    io.sockets.emit("chat", await mensaje.getMessage());
  });
});

if (modoCluster && cluster.isPrimary) {
  // console.log("PORTCLUST", args.port);
  const os = require("os");

  logger.info(`I am the primary process! PID => ${process.pid}`);
  const NUM_WORKERS = os.cpus().length;
  logger.info(`NO. Nucleos => ${NUM_WORKERS};`);

  for (let i = 0; i < NUM_WORKERS; i++) cluster.fork();

  cluster.on("exit", (worker, code) => {
    logger.info("Worker",worker.process.pid,`Exitted on ${new Date().toLocaleDateString()}`);
    cluster.fork();
  });
  cluster.on("online", (worker, code) => {
    logger.info(`Worker ${worker.process.pid} Exitted on ${new Date().toLocaleDateString()}`);
  });
} else {
  // const PORT = process.argv[2] || 8080;
  const PORT = process.env.PORT || 8080;

  const connectedServer = server.listen(PORT, () => {
    logger.info(`[${process.pid}] => Servidor activo y escuchando en el puerto ${PORT}`);
  });

  connectedServer.on("error", (error) => {
    logger.error(error.message);
  });
}
