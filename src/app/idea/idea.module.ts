import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { IdeaController } from './idea-controller.controller';
import { IdeaServiceService } from './idea-service.service';
import { AuthenticationMiddleware } from 'src/middlewares/authentication.middleware';

@Module({
  controllers: [IdeaController],
  providers: [IdeaServiceService],
  exports: [IdeaServiceService]
})
export class IdeaModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthenticationMiddleware).forRoutes(IdeaController)
  }
}
