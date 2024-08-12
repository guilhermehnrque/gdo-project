const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;

const cutomFormat = printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`
})

const logger = createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        cutomFormat
    ),
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'logs.log' })
    ]
})

module.exports = logger;
