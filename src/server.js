const express = require('express');
const cors = require('cors');
const routes = require('./routes');
require('dotenv').config();

const app = express();

let server;

server = require('http').createServer(app);

app.use(express.json({limit: '500mb'}));
app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(process.env.PORT);
