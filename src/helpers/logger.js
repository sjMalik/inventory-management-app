const fs = require('fs');
const path = require('path');
const winston = require('winston');

// Ensure log directory exists
const logDirectory = path.join(__dirname, '../../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}

// Create a Winston logger that logs to console and file
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.printf(info => `${info.timestamp} [${info.level.toUpperCase()}] : ${info.message}`)
  ),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: path.join(logDirectory, 'app.log') })
  ]
});

// Middleware to log requests
logger.requestLogger = (req, res, next) => {
  const start = Date.now();

  res.on('finish', () => {
    const responseTime = Date.now() - start;
    let logMessage = `[REQUEST] ${req.method} ${req.originalUrl} ${res.statusCode} ${responseTime}ms`;

    // Include request body in log message if it exists
    if (Object.keys(req.body).length) {
      logMessage += ` - Request Body: ${JSON.stringify(req.body)}`;
    }

    logger.info(logMessage);
  });

  next();
};

module.exports = logger;

