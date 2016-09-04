## Installation

1. Install [Docker Toolbox](https://www.docker.com/docker-toolbox).
2. Open the Docker Quickstart Terminal app to create a default machine and give you a Docker shell.
3. Set up a Swarm with Machine: https://docs.docker.com/swarm/install-w-machine/
4. Ensure you're pointing at your default machine by running `eval "$(docker-machine env default)"`
5. Run `setup/setup.sh swarm-master` (assuming your Swarm master is called `swarm-master`)
6. Browse to port 3000 on your default machine (`open http://$(boot2docker ip default):3000` in your shell will do that for you)

## Demo

### Overview
![overview](https://raw.githubusercontent.com/DavidOpDeBeeck/swarm-viz/master/screenshots/overview.png)

### Network
![network](https://raw.githubusercontent.com/DavidOpDeBeeck/swarm-viz/master/screenshots/network.png)

### Swarm
![swarm](https://raw.githubusercontent.com/DavidOpDeBeeck/swarm-viz/master/screenshots/swarm.png)
