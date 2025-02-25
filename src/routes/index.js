const express = require('express');
const authRoutes = require('./user.routes');

const router = express.Router();

router.use('/auth', authRoutes);

module.exports = router;
