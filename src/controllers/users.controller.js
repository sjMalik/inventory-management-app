const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../models/users.model');
const { successResponse, errorResponse } = require('../helpers/response.helper');
const logger = require('../helpers/logger');

const register = async (req, res) => {
  try {
    const { email, password, first_name, last_name, role } = req.body;

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return errorResponse(res, 'User already exists', 400);
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.createUser({
      email,
      password: hashedPassword,
      first_name,
      last_name,
      role
    });

    return successResponse(res, 'User registered successfully', newUser, 201);
  } catch (error) {
    return errorResponse(res, 'Registration failed', 500);
  }
};

const login = async (req, res) => {
  logger.info('Login request');
  try {
    const { email, password } = req.body;
    const user = await User.findByEmail(email);

    if (!user || !isSame(user.password, email, password)) {
      logger.error('Invalid email or password');
      return errorResponse(res, 'Invalid email or password', 401);
    }

    console.log(process.env.JWT_SECRET);
    const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' });

    return successResponse(res, 'Login successful', { token });
  } catch (error) {
    logger.error('Login failed', error);
    return errorResponse(res, 'Login failed', 500);
  }
};

function isSame(encoded, email, passwd) {
  let emailhash = crypto.createHash('sha256').update(email).digest('hex');
  let passwdhash = crypto.createHash('sha256').update(passwd).digest('hex');
  let tobehashed = [emailhash, passwdhash].join('+');
  let result = bcrypt.compareSync(tobehashed, encoded);
  return result;
}

module.exports = { register, login };
