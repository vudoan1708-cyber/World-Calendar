const express = require('express'); // load express
const app = express(); // setup express
const port = process.env.PORT || 5000;
const Datastore = require('nedb'); // create database object from nedb
const database = new Datastore('database/countries.db');

database.loadDatabase(); // create a database file

require('dotenv').config(); // create a config for dotenv

const http = require('http');
const server = http.createServer(app);

server.listen(port, () => { console.log('listening at port ' + port) });
app.use(express.static('public')) // setup root directory
app.use(express.json({ limit: '1mb' }));

app.get(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST");
    res.header("Access-Control-Allow-Headers", "Origin, Accept, X-Requested-With, Content-Type, Accept-Language");
    // res.header("Accept-Language", "*");
    next()
});

app.get('/calendar/', function (request, response) {

    // do it this way so that the API key will be secured
    const API_KEY = process.env.API_KEY_EXTRA2 || process.env.API_KEY || process.env.API_KEY_EXTRA;

    // create a response to the client side
    response.json(API_KEY);
});

app.post('/countries/', function(request, response) {
    
    // create a data container
    const data = request.body;

    // get the current timestamp
    const timestamp = Date.now();

    const getDate = new Date(timestamp);

    // for some reason, the hours in the getDate variable is 1 hour earlier than the current ones
    // so plus one to get the exactly hours
    getDate.setHours(getDate.getHours() + 1);

    // replace the generic timestamp with the newly created one
    data.timestamp = getDate;

    // insert data to database
    database.insert(data);

    // create a response to the client side
    response.json(data);
})

app.get('/countries/', function(request, response) {

    // find data
    database.find({}).sort({ timestamp: -1 }).exec(function (err, data) {

        // error handling
        if(err) {
            console.error(err);
            response.end();
            return;
        } else response.json(data);
    })
});

app.get('/maps/', function (request, response) {

    // do it this way so that the API key will be secured
    const MAPS_API_KEY = process.env.MAPS_API_KEY;

    // create a response to the client side
    response.json(MAPS_API_KEY);
});