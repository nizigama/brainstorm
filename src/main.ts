import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    { cors: false }
  );

  app.setBaseViewsDir(join(__dirname, '..', 'src', 'views'));
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
    transform: true,
  }));

  const redisClient = createClient({
    socket: {
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT, 10)
    }
  })

  redisClient.on('error', (err) => console.log('Redis Client Error', err));

  await redisClient.connect()

  let redisStore = new RedisStore({
    client: redisClient,
    prefix: "sessions:",
  })

  app.use(
    session({
      store: redisStore,
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.APP_ENV === "production", httpOnly: true }
    }),
  );

  await app.listen(parseInt(process.env.APP_PORT, 10));
}
bootstrap();
