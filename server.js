const express = require('express'); // load express
const app = express(); // setup express
const port = process.env.PORT || 5000;
require('dotenv').config(); // create a config for dotenv

const http = require('http');
const server = http.createServer(app);

server.listen(port, () => { console.log('listening at port ' + port) });
app.use(express.static('public')) // setup root directory
app.use(express.json({ limit: '1mb' }));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next()
});

app.post('/calendar/', async function (request, response) {

    // do it this way so that the API key will be secured
    const API_KEY = process.env.API_KEY;

    // create a response to the client side
    response.json(API_KEY);
});