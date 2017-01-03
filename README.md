# Swarm Viz

A web application that visualizes a Docker Swarm cluster. 

## Installation

### Secured

``` bash
ls /path/to/cert/directory
ca.cert server.cert server-key.key
```

``` bash
export CERT_PATH=/path/to/cert/directory
export SWARM_HOST=tcp://swarm-master-ip:3376
```

``` bash
docker 
	run 
	  -itd  
	  -p 3000:3000 
	  -e TLS_VERIFY=true 
	  -e CERT_PATH=$CERT_PATH 
	  -e SWARM_HOST=$SWARM_HOST 
	  -v $CERT_PATH:$CERT_PATH 
	dodb/swarm-viz
```

### Unsecured

``` bash
export SWARM_HOST=tcp://swarm-master-ip:3376
```

``` bash
docker 
	run 
	  -itd  
	  -p 3000:3000 
	  -e SWARM_HOST=$SWARM_HOST
	dodb/swarm-viz
```

## Troubleshooting

Swarm VIZ wil log errors to the console. You can inspect the console using the `docker logs [container-id]` command. 

### ECONNREFUSED 

If you get this error try to execute the following command on your Docker Swarm server.

``` bash
iptables -A INPUT -i docker0 -p tcp -m tcp --dport 3376 -j ACCEPT
```

## Demo

[https://www.swarm-viz.com:3000](https://www.swarm-viz.com:3000)
