import { Module } from '@nestjs/common';
import { IdeasToolService } from './ideas-tool.service';
import { BrainService } from './brain.service';

@Module({
    providers: [IdeasToolService,BrainService],
    exports: [BrainService,IdeasToolService]
})
export class BrainModule {}
