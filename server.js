const express = require('express'); // load express
const app = express(); // setup express
const port = process.env.PORT || 5000;

const http = require('http');
const server = http.createServer(app);

server.listen(port, () => { console.log('listening at port ' + port) });
app.use(express.static('public')) // setup root directory
app.use(express.json({ limit: '1mb' }));
