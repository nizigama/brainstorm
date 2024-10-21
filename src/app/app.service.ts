import { Injectable } from '@nestjs/common';
import { ChatService } from './chat/chat.service';
import { IdeaServiceService } from './idea/idea-service.service';

@Injectable()
export class AppService {

  constructor(protected readonly chatService: ChatService, protected readonly ideasService: IdeaServiceService){}

  getHello(): string {
    return 'Hello World!';
  }

  async resetEverything(userId: number): Promise<void>{
      await this.chatService.deleteMessages(userId)
      await this.ideasService.deleteIdeas(userId)
  }
}
