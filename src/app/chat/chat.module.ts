import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConsumerService } from './consumer.service';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { BullModule } from '@nestjs/bullmq';
import { BrainModule } from '../brain/brain.module';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ConsumerService],
  exports: [ChatService],
  imports: [
    BullModule.registerQueue({
      name: 'chat-queue',
    }),
    BrainModule
  ]
})
export class ChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ChatController)
  }
}
