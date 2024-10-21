import { Test, TestingModule } from '@nestjs/testing';
import { BrainService } from './brain.service';
import { IdeasToolService } from './ideas-tool.service';
import { getEntityManagerToken } from '@nestjs/typeorm';

describe('BrainService', () => {
  let service: BrainService;
  let entityManagerMock: any;
  let ideasToolServiceMock: any;

  beforeEach(async () => {
    process.env.OPENAI_API_KEY = 'test-api-key';
    process.env.OPENAI_MODEL = 'gpt-3.5-turbo';

    const module: TestingModule = await Test.createTestingModule({
      providers: [BrainService, {provide: getEntityManagerToken(), useValue: entityManagerMock}, {provide: IdeasToolService, useValue: ideasToolServiceMock}],
    }).compile();
    
    service = module.get<BrainService>(BrainService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
