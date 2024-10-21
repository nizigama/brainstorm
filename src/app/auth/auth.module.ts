import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BullModule } from '@nestjs/bullmq';
import { Consumer } from './consumer';
import { BrainModule } from '../brain/brain.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService, Consumer],
  imports: [
    BullModule.registerQueue({
      name: 'default-queue',
    }),
    BrainModule
  ]
})
export class AuthModule {}
