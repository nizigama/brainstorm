import { Test, TestingModule } from '@nestjs/testing';
import { IdeasToolService } from './ideas-tool.service';

describe('IdeasToolService', () => {
  let service: IdeasToolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeasToolService],
    }).compile();

    service = module.get<IdeasToolService>(IdeasToolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
