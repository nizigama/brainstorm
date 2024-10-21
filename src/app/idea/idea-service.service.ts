import { Injectable } from '@nestjs/common';
import { Idea } from 'src/entities/idea';
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
}
