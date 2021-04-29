//Install express server
const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/APP/dist/APP'), createProxyMiddleware({
    target: 'https://transports-quotations.herokuapp.com',
    onProxyRes: function (proxyRes, req, res) {
        proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

app.get('/*', function(req,res) {

    res.sendFile(path.join(__dirname+'/APP/dist/APP/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);
