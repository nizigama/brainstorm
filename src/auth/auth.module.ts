import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BrainService } from 'src/brain/brain.service';
import { BullModule } from '@nestjs/bullmq';
import { Consumer } from './consumer';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BrainService, Consumer],
  imports: [
    BullModule.registerQueue({
      name: 'default-queue',
    }),
  ]
})
export class AuthModule {}
