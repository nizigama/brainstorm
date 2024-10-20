import { Processor, WorkerHost } from "@nestjs/bullmq";
import { Job } from "bullmq";
import { BrainService } from "src/app/brain/brain.service";

@Processor('default-queue')
export class Consumer extends WorkerHost {

    constructor(protected readonly brainService: BrainService) {
        super();
    }

    async process(job: Job, token?: string): Promise<any> {
        const { userId } = job.data
        await this.brainService.getThread(userId)
    }
}
