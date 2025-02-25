var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
const routes = require('./src/routes/index');
const errorHandler = require('./src/middleware/error.middleware');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./api.yaml');
const dotenv = require('dotenv');

dotenv.config();

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Registering the routes
app.use('/api/v1', routes);

// Global error handler
app.use(errorHandler);

module.exports = app;
