import { Test, TestingModule } from '@nestjs/testing';
import { ChatService } from './chat.service';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { getQueueToken } from '@nestjs/bullmq';

describe('ChatService', () => {
  let service: ChatService;
  let entityManagerMock: any
  let queueMock: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ChatService, {provide: getEntityManagerToken(), useValue: entityManagerMock}, {provide: getQueueToken('chat-queue'), useValue: queueMock}],
    }).compile();

    service = module.get<ChatService>(ChatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
