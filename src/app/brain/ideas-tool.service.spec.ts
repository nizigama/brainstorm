import { Test, TestingModule } from '@nestjs/testing';
import { IdeasToolService } from './ideas-tool.service';
import { getEntityManagerToken } from '@nestjs/typeorm';

describe('IdeasToolService', () => {
  let service: IdeasToolService;
  let entityManagerMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeasToolService, {provide: getEntityManagerToken(), useValue: entityManagerMock}],
    }).compile();

    service = module.get<IdeasToolService>(IdeasToolService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
