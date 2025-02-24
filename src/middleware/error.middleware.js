const { errorResponse } = require('../helpers/response.helper');

/**
 * Global error handling middleware
 * @param {Object} err - The error object
 * @param {Object} req - The Express request object
 * @param {Object} res - The Express response object
 * @param {Function} next - The next middleware function
 */
const errorHandler = (err, req, res, next) => {
    console.error(`[ERROR] ${err.message}`, err);

    // Default error response
    let statusCode = err.statusCode || 500;
    let message = err.message || 'Internal Server Error';

    // Handle specific errors (e.g., validation, database, authentication)
    if (err.name === 'ValidationError') {
        statusCode = 400;
        message = err.details?.map((detail) => detail.message).join(', ') || 'Invalid input data';
    } else if (err.name === 'JsonWebTokenError') {
        statusCode = 401;
        message = 'Invalid authentication token';
    } else if (err.name === 'TokenExpiredError') {
        statusCode = 401;
        message = 'Authentication token has expired';
    } else if (err.code === '23505') {
        // PostgreSQL Unique Constraint Violation
        statusCode = 400;
        message = 'Duplicate entry: A record with the same value already exists';
    }

    return errorResponse(res, message, statusCode);
};

module.exports = errorHandler;
