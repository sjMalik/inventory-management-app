const jwt = require('jsonwebtoken');
const { errorResponse } = require('../helpers/response.helper');

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
        return errorResponse(res, 'Unauthorized', 401);
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return errorResponse(res, 'Unauthorized', 401);
    }
}

module.exports = authMiddleware;