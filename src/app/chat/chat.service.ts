import { InjectQueue } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { ChatDto } from 'src/dto/chat-dto';
import { Message } from 'src/entities/message';
import { EntityManager } from 'typeorm';

@Injectable()
export class ChatService {

    constructor(protected readonly db: EntityManager, @InjectQueue('chat-queue') protected readonly queue: Queue) { }

    async getMessages(userId: number): Promise<Message[]> {

        return await this.db.find(Message, {
            where: {
                user: {
                    id: userId
                }
            },
            select: {
                id: true,
                role: true,
                message: true
            }
        })
    }

    async createMessage(payload: ChatDto, userId: number): Promise<void> {

        const record = this.db.create(Message, {
            role: "human",
            message: payload.message,
            user: {
                id: userId
            }
        })

        await this.db.save(record)

        this.queue.add('user-question', {
            userId: userId,
            question: payload.message
        })
    }

    async deleteMessages(userId: number): Promise<void> {
        await this.db.delete(Message, {user: {
            id: userId
        }})
    }
}
