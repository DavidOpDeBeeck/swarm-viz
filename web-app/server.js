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

//---------------------------
// Globals
//---------------------------

const port = 3000;
const refreshTime = 4000;

const dockerHost = process.env.SWARM_HOST.match( /tcp:\/\/(.*):.*$/ )[ 1 ];
const dockerPort = process.env.SWARM_HOST.match( /tcp:\/\/.*:(.*)$/ )[ 1 ];
const dockerTLS = process.env.TLS_VERIFY;
const dockerCertPath = process.env.CERT_PATH;
const dockerClient = new docker(getConnectionProperties());

function getConnectionProperties() {
    if (dockerTLS) {
        return {
            protocol: 'https',
            host: dockerHost,
            port: dockerPort,
            ca: fs.readFileSync(dockerCertPath + '/ca.cert', 'utf8'),
            cert: fs.readFileSync(dockerCertPath + '/server.cert', 'utf8'),
            key: fs.readFileSync(dockerCertPath + '/server-key.key', 'utf8')
        } 
    } else {
        return {
            protocol: 'http',
            host: dockerHost,
            port: dockerPort
        } 
    }
}

//---------------------------
// Routes
//---------------------------

app.use(express.static( 'static' ));

http.listen(port, () => console.log('listening on *:3000'));

//---------------------------
// Docker network fetch
//---------------------------

function listNetworks( callback ) {
    dockerClient.listNetworks({all: 1}, ( err, networks ) => {
        handleNetworksResponse(networks, callback);
        setTimeout(() => listNetworks( callback ), refreshTime);
    });
}

function handleNetworksResponse( networks, callback ) {
    if ( !networks ) return;

    let res = [];

    networks.forEach( networkInfo => {
        let networkName = networkInfo.Name;
        let networkId = networkInfo.Id;
        let networkContainers = networkInfo.Containers;
        let networkContainerIds = Object.keys( networkContainers )
                                        .filter( c => c.indexOf( 'ep-' ) == -1 );

        let filteredNetworkContainers = [];

        networkContainerIds.forEach( id => {
            filteredNetworkContainers.push({
                name: networkContainers[ id ].Name,
                endpoint: networkContainers[ id ].EndpointID
            });
        } )

        res.push({
            id: networkId,
            name: networkName,
            containers: filteredNetworkContainers
        });
    } );

    callback(res);
}

listNetworks( networks => io.emit( 'networks', networks ) );

//---------------------------
// Docker container fetch
//---------------------------

function listContainers( callback ) {
    dockerClient.listContainers({all: 1}, ( err, containers ) => {
        handleContainersResponse(containers, callback);
        setTimeout( () => listContainers(callback), refreshTime );
    });
}

function handleContainersResponse( containers, callback ) {
    if ( !containers ) return;

    let res = [];

    containers.forEach( containerInfo => {
        let containerNames = containerInfo.Names;

        if ( !containerNames.length ) return;

        let tokens = containerNames[0].split( '/' );

        if ( tokens.length < 2 ) return;

        let containerHost = tokens[ 1 ];
        let containerName = tokens[ 2 ];

        let container = {
            id: containerInfo.Id,
            name: containerName,
            image: containerInfo.Image.split( ":" )[ 0 ],
            state: containerInfo.State,
            status: containerInfo.Status,
            created: containerInfo.Created,
            networks: Object.keys( containerInfo.NetworkSettings.Networks )
        };

        var index = res.findIndex( h => h.name == containerHost );

        if ( index == -1 ) {
            res.push({
                name: containerHost,
                containers: []
            });
            index = res.length - 1;
        }

        res[index].containers.push( container );
    });

    callback(res);
}

listContainers( containers => io.emit( 'containers', containers ) );
