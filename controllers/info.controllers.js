// const {args} = require('../config/config')
const os = require("os");

// obtiene un vista de la informacion del sistema
const listarInfoController = (req, res) => {
  let MemoriaRss = process.memoryUsage();
  const info = {
    // argumento: JSON.stringify(args),
    argumento: process.argv.slice(2),
    sistemaOperativo: process.platform,
    vercionNode: process.version,
    memoria: MemoriaRss.rss,
    pathEjecutable: process.execPath,
    processId: process.pid,
    carpetaProyecto: process.cwd(),
    cantidadNucleos: os.cpus().length,
  };

  res.render("info", { info });
};

module.exports = listarInfoController;

