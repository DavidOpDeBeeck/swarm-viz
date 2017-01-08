//---------------------------
// Modules
//---------------------------

"use strict"

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

const express = require('express');
const app = express();
const http = require('http').Server( app );
const io = require('socket.io')( http );
const docker = require('dockerode');
const fs = require('fs');

const eventBus = require('./server_modules/event.module').init(app, io);
const networkModule = require('./server_modules/network.module');
const containerModule = require('./server_modules/container.module');

//---------------------------
// Default Config
//---------------------------

const port = 3000;
const pollingRate = 6000;

//---------------------------
// Docker Connection
//---------------------------

let createConnection = ({host, port, certPath, tls = false}) => {
    if (tls)
        return securedConnection(host, port, certPath);
    return unsecuredConnection(host, port)
}

let securedConnection = (host, port, certPath) => {
    return {
        protocol: 'https',
        host: host,
        port: port,
        ca: fs.readFileSync(certPath + '/ca.cert', 'utf8'),
        cert: fs.readFileSync(certPath + '/server.cert', 'utf8'),
        key: fs.readFileSync(certPath + '/server-key.key', 'utf8')
    };
}

let unsecuredConnection = (host, port) => {
    return {
        protocol: 'http',
        host: host,
        port: port
    };
}

//---------------------------
// Docker Config
//---------------------------

const dockerHost = process.env.SWARM_HOST.match( /tcp:\/\/(.*):.*$/ )[ 1 ];
const dockerPort = process.env.SWARM_HOST.match( /tcp:\/\/.*:(.*)$/ )[ 1 ];
const dockerTLS = process.env.TLS_VERIFY;
const dockerCertPath = process.env.CERT_PATH;
const dockerClient = new docker(createConnection({
    host: dockerHost, 
    port: dockerPort, 
    certPath: dockerCertPath, 
    tls: dockerTLS
}));

//---------------------------
// Routes
//---------------------------

app.use(express.static( 'static' ));

http.listen(port, () => console.log('listening on *:3000'));

//---------------------------
// Timer
//---------------------------

let timer = {
    next() {
        return pollingRate;
    }
}

//---------------------------
// Start Network module
//---------------------------

networkModule.init({
    app: app,
    eventBus: eventBus,
    dockerClient: dockerClient,
    timer: timer
}).start();

//---------------------------
// Start Container module
//---------------------------

containerModule.init({
    app: app,
    eventBus: eventBus,
    dockerClient: dockerClient,
    timer: timer
}).start();
