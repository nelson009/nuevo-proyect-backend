const os = require("os");

const listarInfoNoDebug = (req, res) => {
    let MemoriaRss = process.memoryUsage();
    const info = {
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

module.exports = listarInfoNoDebug;
