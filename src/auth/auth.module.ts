import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BrainService } from 'src/brain/brain.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, BrainService]
})
export class AuthModule {}
