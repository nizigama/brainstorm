import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from '../entities/message.entity';
import { Idea } from '../entities/idea.entity';
import { AuthModule } from './auth/auth.module';
import { User } from '../entities/user.entity';
import { AuthenticationMiddleware } from '../middlewares/authentication.middleware';
import { GuestMiddleware } from '../middlewares/guest.middleware';
import { AuthController } from './auth/auth.controller';
import { BullModule } from '@nestjs/bullmq';
import { Assistant } from '../entities/assistant.entity';
import { Thread } from '../entities/thread.entity';
import { ChatModule } from './chat/chat.module';
import { BrainModule } from './brain/brain.module';
import { IdeaModule } from './idea/idea.module';

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
        Assistant,
        Thread,
        Message,
        Idea,
      ],
      autoLoadEntities: true,
      synchronize: process.env.APP_ENV !== "production",
    }),
    BullModule.forRoot({
      connection: {
        host: process.env.REDIS_HOST,
        port: parseInt(process.env.REDIS_PORT, 10),
      },
    }),
    AuthModule,
    ChatModule,
    BrainModule,
    IdeaModule,
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