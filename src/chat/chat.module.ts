import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { ConsumerService } from './consumer.service';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';
import { BullModule } from '@nestjs/bullmq';
import { BrainService } from 'src/brain/brain.service';

@Module({
  controllers: [ChatController],
  providers: [ChatService, ConsumerService, BrainService],
  imports: [
    BullModule.registerQueue({
      name: 'chat-queue',
    }),
  ]
})
export class ChatModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(ChatController)
  }
}
