import { HttpException, HttpStatus, Injectable, OnApplicationBootstrap } from '@nestjs/common';
import OpenAI from 'openai';
import { Assistant, AssistantTool } from 'openai/resources/beta/assistants';
import { TextContentBlock } from 'openai/resources/beta/threads/messages';
import { Run } from 'openai/resources/beta/threads/runs/runs';
import { Assistant as AssistantEntity } from 'src/entities/assistant';
import { Thread } from 'src/entities/thread';
import { EntityManager } from 'typeorm';
import { IdeasToolService } from './ideas-tool.service';

@Injectable()
export class BrainService implements OnApplicationBootstrap {

    protected openai: OpenAI
    protected assistant: Assistant

    constructor(protected readonly db: EntityManager, protected readonly ideaTool: IdeasToolService) {
        this.openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
    }

    async onApplicationBootstrap(): Promise<void> {
        await this.makeAssistant()
    }

    protected assistantTools(): AssistantTool[]{
        return [
            {
                type: "function",
                function: {
                    name: "saveIdea",
                    description: "Save an idea brainstormed with the user to a persistant storage",
                    strict: true,
                    parameters: {
                        type: "object",
                        properties: {
                            idea: {
                                type: "string",
                                description: "The idea to be saved",
                            },
                        },
                        required: ["idea"],
                        additionalProperties: false
                    }
                }
            }
        ]
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
            name: "Brainstorming assistant",
            tools: this.assistantTools(),
            model: process.env.OPENAI_MODEL
        });

        const record = this.db.create(AssistantEntity, {
            identifier: assistant.id,
            name: assistant.name,
            model: assistant.model,
            temperature: assistant.temperature
        })

        await this.db.save(record)

        this.assistant = assistant
    }

    async getThread(userId: number): Promise<Thread> {

        const ths = await this.db.find(Thread, {
            select: {
                identifier: true
            },
            where: {
                user: {
                    id: userId
                }
            }
        })

        if (ths.length > 0) {
            return ths[0]
        }

        const th = await this.openai.beta.threads.create();

        const record = this.db.create(Thread, {
            identifier: th.id,
            user: {
                id: userId
            }
        })

        return await this.db.save(record)
    }

    protected async getAssistantReply(run: Run): Promise<string>{
        const messages = await this.openai.beta.threads.messages.list(
            run.thread_id
        );

        const contents = messages.data[0].content

        const content = contents[0] as TextContentBlock

        return content.text.value
    }

    async run(userId: number, th: Thread, message: string): Promise<string> {
        await this.openai.beta.threads.messages.create(
            th.identifier,
            {
                role: "user",
                content: message
            }
        );

        const run = await this.openai.beta.threads.runs.createAndPoll(
            th.identifier,
            {
                assistant_id: this.assistant.id,
                instructions: "You are a helpful personal assistant that helps in brainstorming ideas then save them if necessary"
            }
        );

        if (run.status === 'completed') {
            return this.getAssistantReply(run)
        } else if (run.status === "requires_action") {
            const toolCalls = run.required_action?.submit_tool_outputs.tool_calls

            const toolsOutputs = []

            for(const call of toolCalls){
                if (call.function.name !== "saveIdea") {
                    continue
                }

                this.ideaTool.saveIdea(userId, call.function.arguments)

                toolsOutputs.push({
                    tool_call_id: call.id,
                    output: "Idea successfully saved!",
                })
            }

            if (toolsOutputs.length === 0) {
                throw new HttpException("Failed to save idea", HttpStatus.INTERNAL_SERVER_ERROR)
            }

            const toolRun = await this.openai.beta.threads.runs.submitToolOutputsAndPoll(
                th.identifier,
                run.id,
                { tool_outputs: toolsOutputs },
              );

              return this.getAssistantReply(toolRun)
        } else {
            console.log(run.status, run);
        }
    }

}
