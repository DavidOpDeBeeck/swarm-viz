//---------------------------
// Modules
//---------------------------

"use strict"

const express = require('express');
const app = express();
const http = require( 'http' ).Server( app );
const io = require( 'socket.io' )( http );
const docker = require( 'dockerode' );
const fs = require( 'fs' );

//---------------------------
// Globals
//---------------------------

const port = 3000;
const refreshTime = 2000;
var dHost = process.env.SWARM_HOST.match(/tcp:\/\/(.*):.*$/)[1];
var dPort = process.env.SWARM_HOST.match(/tcp:\/\/.*:(.*)$/)[1];
var dCertPath = process.env.DOCKER_CERT_PATH;

const dConnection = new docker({
    protocol: 'https',
    host: dHost,
    port: dPort,
    ca: process.env.SWARM_CA || fs.readFileSync(dCertPath + '/ca.pem'),
    cert: process.env.SWARM_CERT || fs.readFileSync(dCertPath + '/server.pem'),
    key: process.env.SWARM_KEY || fs.readFileSync(dCertPath + '/server-key.pem')
});

//---------------------------
// Routes
//---------------------------

app.get( '/', ( req, res ) => {
    res.sendFile( __dirname + '/static/index.html' );
});

app.use(express.static('static'));

http.listen( port, () => {
    console.log( 'listening on *:3000' );
});

//---------------------------
// Docker container fetch
//---------------------------

function listNetworks( callback ) {
  dConnection.listNetworks({
    all : 1
  }, ( err, networks ) => {
    networks.forEach( nInfo => {

    });
  });
}

function listContainers( callback ) {
    let res = {
        hosts: {}
    };
    dConnection.listContainers({
      all: 1
    }, ( err, containers ) => {
        if ( containers ) {
            containers.forEach( cInfo => {
                let names = cInfo.Names;

                if ( !names.length ) return;

                let tokens = names[ 0 ].split( '/' );

                if ( tokens.length < 2 ) return;

                let host = tokens[ 1 ];
                let name = tokens[ 2 ];

                let data = {
                    id: cInfo.Id,
                    name: name,
                    image: cInfo.Image.split(":")[0],
                    state: cInfo.State,
                    status: cInfo.Status,
                    created: cInfo.Created,
                    networks: Object.keys(cInfo.NetworkSettings.Networks)
                };

                if ( !res.hosts[ host ] )
                    res.hosts[ host ] = [];

                res.hosts[ host ].push( data );
            });

            callback( res );
        }
        setTimeout( function () {
            listContainers( callback );
            //listNetworks();
        }, refreshTime );
    } );
}
listNetworks();
listContainers( function ( containers ) {
    io.emit( 'containers', containers );
} );
