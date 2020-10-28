require = require('esm')(module); // allows us to use import/export
const server = require('./server.js')
module.exports = server;