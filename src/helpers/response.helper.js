const logger = require('./logger');

const successResponse = (res, data = null, message, statusCode = 200) => {
    logger.info(`[SUCCESS] ${message}`);
    return res.status(statusCode).json({
        status: 'success',
        message,
        data,
    });
};

const errorResponse = (res, message, statusCode = 500) => {
    logger.error(`[ERROR] ${message}`);
    return res.status(statusCode).json({
        status: 'error',
        message,
    });
};

module.exports = { successResponse, errorResponse };