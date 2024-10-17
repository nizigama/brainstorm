import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    {cors: false}
  );

  app.setBaseViewsDir(join(__dirname,'..','src','views'));
  app.setViewEngine('ejs');

  app.useGlobalPipes(new ValidationPipe({
    whitelist: false,
    transform: true,
  }));

  app.use(
    session({
      secret: process.env.APP_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: process.env.APP_ENV === "production", httpOnly: true}
    }),
  );

  await app.listen(parseInt(process.env.APP_PORT,10));
}
bootstrap();
