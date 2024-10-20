import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';
import { BrainService } from 'src/brain/brain.service';
import { Message } from 'src/entities/message';
import { EntityManager } from 'typeorm';

@Processor('chat-queue')
export class ConsumerService extends WorkerHost {
    constructor(protected readonly brainService: BrainService, protected readonly db: EntityManager) {
        super();
    }

    async process(job: Job, token?: string): Promise<any> {
        console.log("Starting work: " + job.id);
        
        const { userId, question } = job.data
        const thread = await this.brainService.getThread(userId)

        const assistantMessage = await this.brainService.run(thread, question)

        const record = await this.db.create(Message, {
            role: "assistant",
            message: assistantMessage,
            user: {
                id: userId
            }
        })

        await this.db.save(record)

        console.log("Completed work: " + job.id);
    }
}
