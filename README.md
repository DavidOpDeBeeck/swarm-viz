## Installation

```
> ls /path/to/cert/directory
ca.pem  server-key.pem  server.pem
```

```
> export CERT_PATH=/path/to/cert/directory
> export SWARM_HOST=tcp://swarm-master-ip:3376
```

```
> docker 
      run
        -itd
        -p 3000:3000
        -e CERT_PATH=$CERT_PATH 
        -e SWARM_HOST=$SWARM_HOST
        -v $CERT_PATH:$CERT_PATH
      dodb/swarm-viz
```


## Demo

[https://www.swarm-viz.com:3000](https://www.swarm-viz.com:3000)
