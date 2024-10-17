import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './entities/message';
import { Idea } from './entities/idea';
import { AuthModule } from './auth/auth.module';
import { User } from './entities/user';
import { AuthenticationMiddleware } from './middlewares/authentication.middleware';
import { GuestMiddleware } from './middlewares/guest.middleware';
import { AuthController } from './auth/auth.controller';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [
        User,
        Message,
        Idea
      ],
      autoLoadEntities: true,
      synchronize: process.env.APP_ENV !== "production",
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.DB_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
      },
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(AppController)
    consumer.apply(GuestMiddleware).forRoutes(AuthController)
  }
}