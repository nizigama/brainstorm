import { Injectable } from '@nestjs/common';
import { Idea } from 'src/entities/idea.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class IdeaServiceService {
    constructor(protected readonly db: EntityManager){}

    async getUserIdeas(userId: number): Promise<Idea[]> {
       return await this.db.find(Idea, {
            where: {
                user: {
                    id: userId
                }
            },
            select: {
                id: true,
                content: true
            }
        })
    }

    async deleteIdeas(userId: number): Promise<void> {
        await this.db.delete(Idea, {user: {
            id: userId
        }})
    }
}
