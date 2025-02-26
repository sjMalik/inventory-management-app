const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/users.model');
const { successResponse, errorResponse } = require('../helpers/response.helper');
const logger = require('../helpers/logger');

const login = async (req, res) => {
    logger.info('[LOGIN] Login request received');
    try {
        const { email, password } = req.body;
        const user = await User.findByEmail(email);
        if (!user) {
            logger.error('[LOGIN] User not found');
            return errorResponse(res, 'User not found', 404);
        }

        if (!isSamePassword(password, user.password, email)) {
            logger.error('[LOGIN] Invalid password');
            return errorResponse(res, 'Invalid password', 401);
        }

        const token = jwt.sign({ id: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d'
        });

        return successResponse(res, { token }, 'Login successful');
    } catch (error) {
        logger.error(`[LOGIN] Error: ${error.message}`);
        return errorResponse(res, error.message, 500);
    }
}

function isSamePassword(password, hash, email) {
    const emailhash = crypto.createHash('sha256').update(email).digest('hex');
    const passwordhash = crypto.createHash('sha256').update
        (password).digest('hex');
    const tobehashed = [emailhash, passwordhash].join('+');
    return bcrypt.compareSync(tobehashed, hash);
}

module.exports = { login };