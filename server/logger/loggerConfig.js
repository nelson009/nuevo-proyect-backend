const winston = require("winston");

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console({
            level: "info",
        }),
        new winston.transports.File({
            filename: "warn.log",
            level: "warn",
        }),
        new winston.transports.File({
            filename: "error.log",
            level: "error",
        }),
    ],
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.align(),
        winston.format.timestamp(),
        winston.format.printf((info) => `[${info.timestamp}] [${info.level}] | ${info.message}`)
    )
});

module.exports = logger;
