import { Injectable } from '@nestjs/common';
import { Idea } from 'src/entities/idea.entity';
import { EntityManager } from 'typeorm';

@Injectable()
export class IdeasToolService {
    constructor(protected readonly db: EntityManager){}

    async saveIdea(userId: number, content: string): Promise<void>{

        console.log("Saving an idea...");

        const ideaContent = JSON.parse(content) as Record<string,string>;

        const idea = this.db.create(Idea, {
            content: ideaContent.idea,
            user: {
                id: userId
            }
        })

        await this.db.save(idea)

        console.log("Idea saved successfuly!");
    }
}
