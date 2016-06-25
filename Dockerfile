FROM node:6.2.0

# Grunt

RUN npm install -g grunt-cli

# Copy files to app directory

RUN mkdir /app
COPY web-app /app
WORKDIR /app

# Install npm dependencies

RUN npm install grunt
RUN npm install

# Execute grunt task

RUN grunt dependencies -v
RUN grunt release -v

EXPOSE 3000

ENTRYPOINT [ "node", "server" ]
