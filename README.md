# Brainstorm App

### Setup
The following are procedures to follow when setting up the Brainstorm app for the first time.
Make sure you have the docker engine running with docker-compose installed

```shell
# copy and set environment variables needed to run the service. Most importantly the `OPENAI_API_KEY` and `APP_SECRET` keys
cp .env.example .env
```

### Run the project

- The following will install all required npm packages and start the mysql and redis servers needed by the NestJS service, then start the whole app
```shell
docker-compose up
```

- The app will be available on the port exposed by the `APP_PORT` environment variable, by default it's the port `3500`

### Usage
Useful when you need to install new packages, use the NestJS cli command, ...
```shell
# access node environment
docker container run --rm -it -v $(pwd):/home/app -w /home/app $(docker build --quiet .) bash

# run whatever command you want
npm install mongoose
```


### Run tests

```shell
# access node environment
docker container run --rm -it -v $(pwd):/home/app -w /home/app $(docker build --quiet .) bash

# run unit tests inside the opened node environment
npm run test

# run e2e tests inside the opened node environment
npm run test:e2e
```