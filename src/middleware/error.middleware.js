const logger = require('../helpers/logger');
const {errorResponse} = require('../helpers/response.helper');

const errorHandler = (err, req, res, next) => {
    logger.error(`[ERROR] ${err.message}`, err);

    // Default the error response
    let statusCode= err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific error (e.g. validation error, database error, etc.)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.details.map(d => d.message).join(', ') || 'Validation Error';
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Unauthorized';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Token Expired'; 
    } else if (err.code === '23505') {
        statusCode = 400;
        message = 'Duplicate Key';
    }

    return errorResponse(res, statusCode, message);
};

module.exports = errorHandler;