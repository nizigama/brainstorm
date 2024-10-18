import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import OpenAI from 'openai';
import { Assistant } from 'openai/resources/beta/assistants';
import { Assistant as AssistantEntity } from 'src/entities/assistant';
import { Thread } from 'src/entities/thread';
import { EntityManager } from 'typeorm';

@Injectable()
export class BrainService implements OnApplicationBootstrap {

    protected openai: OpenAI
    protected assistant: Assistant

    constructor(protected readonly db: EntityManager) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });        
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.makeAssistant()
    }

    protected async makeAssistant(): Promise<void> {

        const assistants = await this.db.find(AssistantEntity)
        
        if (assistants.length > 0) {

            const firstAssistant = assistants[0]

            this.assistant = await this.openai.beta.assistants.retrieve(firstAssistant.identifier)
            return;
        }
        
        console.log("Creating new assistant...");
        
        const assistant = await this.openai.beta.assistants.create({
            name: "Brainstorming buddy",
            tools: [],
            model: process.env.OPENAI_MODEL
        });

        const record = this.db.create(AssistantEntity,{
            identifier: assistant.id,
            name: assistant.name,
            model: assistant.model,
            temperature: assistant.temperature
        })

        await this.db.save(record)

        this.assistant = assistant
    }

    async getThread(userId: number): Promise<OpenAI.Beta.Threads.Thread> {

        const ths = await this.db.find(Thread,{
            select:{
                identifier:true
            },
            where: {
                user: {
                    id: userId
                }
            }
        })

        if(ths.length > 0){
            const th = ths[0]
            return await this.openai.beta.threads.retrieve(th.identifier) 
        }

        const th = await this.openai.beta.threads.create();

        const record = this.db.create(Thread,{
            identifier: th.id,
            user: {
                id: userId
            }
        })

        await this.db.save(record)

        return th
    }

    // async run(th: Thread) {
    //     const msg = await this.openai.beta.threads.messages.create(
    //         th.id,
    //         {
    //             role: "user",
    //             content: "What interesting and profitable tech product would be amazing to build for the american and european markets?"
    //         }
    //     );

    //     console.log(msg);

    //     const run = await this.openai.beta.threads.runs.createAndPoll(
    //         th.id,
    //         {
    //             assistant_id: this.assistant.id,
    //             instructions: "You are a helpful personal assistant that helps in brainstorming ideas"
    //         }
    //     );

    //     if (run.status === 'completed') {
    //         const messages = await this.openai.beta.threads.messages.list(
    //             run.thread_id
    //         );
    //         for (const message of messages.data.reverse()) {
    //             const content = message.content[0] as TextContentBlock
    //             console.log(`${message.role} > ${content.text.value}`);
    //         }
    //     } else {
    //         console.log(run.status);
    //     }
    // }

}
