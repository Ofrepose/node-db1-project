const express = require("express");
const api_router = require('./api_Router')

const db = require("../data/dbConfig.js");

const server = express();

server.use(express.json());
server.use('/api', api_router)

module.exports = server;
