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
const dHost = process.env.SWARM_HOST.match(/tcp:\/\/(.*):.*$/)[1];
const dPort = process.env.SWARM_HOST.match(/tcp:\/\/.*:(.*)$/)[1];
const dCertPath = process.env.DOCKER_CERT_PATH;

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
  let res = {
      networks: {}
  };
  dConnection.listNetworks({
    all : 1
  }, ( err, networks ) => {
    networks.forEach( nInfo => {
      let nName = nInfo.Name, nId = nInfo.Id;
      let nContainers = nInfo.Containers;
      let container, containers = [];

      for ( let id in nContainers ) {
        if ( id.indexOf("ep-") == -1 ) {
          container = nContainers[id];
          containers.push({
            name: container.Name,
            endpoint: container.EndpointID
          });
        }
      }

      res.networks[nName] = {
          id : nId,
          name : nName,
          containers : containers
      };
    });

    callback( res );

    setTimeout( function () {
        listNetworks( callback );
    }, refreshTime );
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
                let cNames = cInfo.Names;

                if ( !cNames.length )
                  return;

                let tokens = cNames[ 0 ].split( '/' );

                if ( tokens.length < 2 )
                  return;

                let cHost = tokens[ 1 ];
                let cName = tokens[ 2 ];

                let container = {
                    id: cInfo.Id,
                    name: cName,
                    image: cInfo.Image.split(":")[0],
                    state: cInfo.State,
                    status: cInfo.Status,
                    created: cInfo.Created,
                    networks: Object.keys(cInfo.NetworkSettings.Networks)
                };

                if ( !res.hosts[ cHost ] )
                    res.hosts[ cHost ] = {
                      name : cHost,
                      containers : []
                    };

                res.hosts[ cHost ].containers.push(container);
            });

            callback( res );
        }
        setTimeout( function () {
            listContainers( callback );
        }, refreshTime );
    } );
}

listNetworks(function ( networks ) {
    io.emit( 'networks', networks );
});
listContainers( function ( containers ) {
    io.emit( 'containers', containers );
});
