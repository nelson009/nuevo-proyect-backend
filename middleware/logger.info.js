const logger = require('../logger/loggerConfig');

const peticionServerInfo = (req, res, next) => {
    const method = `[${req.method}]`;
    const url = req.url;
    // const url = req.originalUrl;
    logger.info({ method, url });
    next();
}

module.exports = peticionServerInfo;