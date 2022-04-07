// const {args} = require('../config/config')
const os = require("os");

const listarInfo = (req, res) => {
  let MemoriaRss = process.memoryUsage();
  // console.log(MemoriaRss)
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

module.exports = listarInfo;
