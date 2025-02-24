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

module.exports = logger;

