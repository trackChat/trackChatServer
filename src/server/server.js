

require('dotenv').config();

const express = require('express');
const app = express();
const notFoundHandler = require('../middleware/404.js');
const errorHandler = require('../middleware/500.js');
const router = require('./router');



app.use(express.json());
app.use(router);
app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = { app: app };