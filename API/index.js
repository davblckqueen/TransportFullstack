'use strict';

var path = require('path');
var http = require('http');

var oas3Tools = require('oas3-tools');
var serverPort = process.env.PORT || 8080;

// Dependencies
const cors = require('cors')
const mongoose = require('mongoose');

// swaggerRouter configuration
var options = {
    routing: {
        controllers: path.join(__dirname, './controllers')
    },
};

var expressAppConfig = oas3Tools.expressAppConfig(path.join(__dirname, 'api/openapi.yaml'), options);
var app = expressAppConfig.getApp();
app.use(cors());

// Initialize the Swagger middleware
http.createServer(app).listen(serverPort, async () => {
    // Database connection
    await mongoose.connect(process.env.MONGO_URL+"?ssl=true&replicaSet=globaldb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        retryWrites: false
    })
        .then(() => console.log('Connection to MongoAtlas successful'))
        .catch((err) => console.error(err));
    console.log('Your server is listening on port %d (http://localhost:%d)', serverPort, serverPort);
    console.log('Swagger-ui is available on http://localhost:%d/docs', serverPort);
});

