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
- Click [here to access the app](http://localhost:3500)

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

##### PS: Authentication tests might fail on m series macbooks, due to some incompatibility of the bcrypt package with the arm64 architectures

### Notes
1. The `APP_SECRET` variable is used to sign the sessionID in the cookie to prevent anyone from changing it, changing it would break the signature hence making the cookie invalid. It can be anything from a string to a buffer but preferably it should be a long and random alphanumeric string. More about it can be found [here](https://www.npmjs.com/package/express-session#secret)

2. I used the Redis database as a storage for the sessions driver cause the app is stateful(uses cookies and sessions), and I used MySQL as the main database for other database related features. Using both MySQL and Redis was a personal choice as I could have used one for both use cases, but I decided to use Redis as a session driver because it's faster and usually better at handling concurrent tasks than MySQL.

3. The chatbot being slower to respond, I would say it comes from the fact that I set a 3 seconds interval between each check for the AI response from the backend. This was done intentionally as I didn't choose to implement websockets to send AI responses in realtime, again I made this decision because I thought it was an overkill for now since the app is just for demonstration purpose. But I could implement it in no time if you want me to.