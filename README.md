## Installation

```
export CERT_PATH=/path/to/cert/directory
```

```
export SWARM_CA=$(cat $CERT_PATH/ca.pem)
export SWARM_CERT=$(cat $CERT_PATH/cert.pem)
export SWARM_KEY=$(cat $CERT_PATH/key.pem)
export SWARM_HOST=tcp://swarm-master-ip:3376
```

```
docker 
      run
        -itd
        -p 3000:3000
        -e SWARM_CA=$SWARM_CA
        -e SWARM_CERT=$SWARM_CERT
        -e SWARM_KEY=$SWARM_KEY
        -e SWARM_HOST=$SWARM_HOST
      dodb/swarm-viz
```


## Demo

[https://www.swarm-viz.com:3000](https://www.swarm-viz.com:3000)
