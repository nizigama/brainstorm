FROM ubuntu:22.04

ARG NODE_VERSION=20

WORKDIR /home/app

RUN apt-get update \
    && apt install -y curl \
    && curl -sLS https://deb.nodesource.com/setup_$NODE_VERSION.x | bash - \
    && apt-get install -y nodejs \
    && apt-get -y autoremove \
    && apt-get -y clean \
    && npm install -g npm

CMD ["npm", "run", "start:dev"]