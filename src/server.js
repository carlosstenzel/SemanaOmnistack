const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');



mongoose.connect(
    process.env.URL_BD_MONGO,
    {
        useNewUrlParser: true
    }
);

const server = express();

server.use(express.json());
server.use(routes);

server.listen(3333);
