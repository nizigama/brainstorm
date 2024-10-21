import { Body, Controller, Get, HttpCode, HttpStatus, Post, Session } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatDto } from 'src/dto/chat.dto';

@Controller('chat')
export class ChatController {

    constructor(protected readonly service: ChatService) { }

    @Get()
    async index(@Session() session: Record<string, any>) {
        const messages = await this.service.getMessages(session.userId)

        return messages
    }

    @Post()
    @HttpCode(HttpStatus.OK)
    store(@Body() req: ChatDto, @Session() session: Record<string, any>) {
        this.service.createMessage(req, session.userId)
    }
}
