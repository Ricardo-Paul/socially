require = require('esm')(module); // allows us to use import/export
require('dotenv').config(); //helps us read from our .env file

const server = require('./server.js')
module.exports = server;