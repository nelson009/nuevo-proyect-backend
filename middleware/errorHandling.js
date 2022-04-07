const logger = require("../logger/loggerConfig");

const ErrorHandling = (req, res, next) => {
    const method = req.method;
    logger.warn({ method, descripcion: `Ruta ${req.originalUrl} no implementado.` });

    res.status(500).json({ error: -2, descripcion: `Ruta ${req.originalUrl} no implementado.`, });
};

module.exports = ErrorHandling;
