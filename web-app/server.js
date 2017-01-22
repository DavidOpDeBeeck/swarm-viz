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

const EventBus = require('./server_modules/eventbus.module');
const EventListener = require('./server_modules/event.module');
const NetworkModule = require('./server_modules/network.module');
const ContainerModule = require('./server_modules/container.module');

//---------------------------
// Default Config
//---------------------------

const port = 3000;
const pollingRate = 6000;

//---------------------------
// Docker Connection
//---------------------------

let createConnection = ({host, port, certPath, tls = false}) => {
    return tls ? secured(host, port, certPath) : unsecured(host, port);
}

let secured = (host, port, certPath) => {
    return {
        protocol: 'https',
        host: host,
        port: port,
        ca: fs.readFileSync(certPath + '/ca.cert', 'utf8'),
        cert: fs.readFileSync(certPath + '/server.cert', 'utf8'),
        key: fs.readFileSync(certPath + '/server-key.key', 'utf8')
    };
}

let unsecured = (host, port) => {
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
// Modules
//---------------------------

let eventBus = new EventBus(io);

let networkModule = new NetworkModule({
    app: app,
    dockerClient: dockerClient,
});

let containerModule = new ContainerModule({
    app: app,
    dockerClient: dockerClient,
});

let modules = [networkModule, containerModule];

let eventListener = new EventListener({
    eventBus: eventBus,
    dockerClient: dockerClient,
    containerModule: containerModule,
    networkModule: networkModule,
    pollingRate: pollingRate
});

modules.forEach(module => module.setup());
modules.forEach(module => module.refresh());

eventListener.setup();

listen(eventListener);

function listen(listener) {
    try {
        listener.listen();
    } catch(e) {
        console.log(e);
        listen(listener);
    }
}