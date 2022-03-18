const {args} = require('../config/config')

const listarInfo = (req, res) =>  {
   let MemoriaRss = process.memoryUsage()
   const info = {
      argumento: JSON.stringify(args),
      sistemaOperativo: process.platform,
      vercionNode: process.version,
      memoria: MemoriaRss.rss,
      pathEjecutable: process.execPath,
      processId: process.pid,
      carpetaProyecto: process.cwd(),
   }
   
   res.render("info", {info})
}
    
module.exports = listarInfo
