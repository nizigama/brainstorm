import { Controller, Get, Session } from '@nestjs/common';
import { IdeaServiceService } from './idea-service.service';

@Controller('ideas')
export class IdeaController {

    constructor(protected readonly service: IdeaServiceService){}

    @Get()
    index(@Session() session: Record<string,any>){
        return this.service.getUserIdeas(session.userId)
    }
}
