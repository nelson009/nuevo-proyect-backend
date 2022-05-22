const server = require('./server');
const { MODE_CLUSTER } = require("./config/config");
const logger = require('./logger/loggerConfig');
const modoCluster = MODE_CLUSTER.toUpperCase() === "CLUSTER";

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