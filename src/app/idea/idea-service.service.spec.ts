import { Test, TestingModule } from '@nestjs/testing';
import { IdeaServiceService } from './idea-service.service';

describe('IdeaServiceService', () => {
  let service: IdeaServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeaServiceService],
    }).compile();

    service = module.get<IdeaServiceService>(IdeaServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
