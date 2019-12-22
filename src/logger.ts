import winston from 'winston';

const logger: winston.Logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'rules-service' },
    transports: [
        // new winston.transports.File({ filename: 'error.log', level: 'error' }),
        // new winston.transports.File({ filename: 'combined.log' }),
        new winston.transports.Console()
    ],
});

// if (process.env.NODE_ENV !== 'production') {
//     logger.add(new winston.transports.Console({ format: winston.format.simple() }));
// }

// module.exports = logger;

export default logger;