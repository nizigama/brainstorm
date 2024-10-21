import { Test, TestingModule } from '@nestjs/testing';
import { IdeaServiceService } from './idea-service.service';
import { getEntityManagerToken } from '@nestjs/typeorm';

describe('IdeaServiceService', () => {
  let service: IdeaServiceService;
  let entityManagerMock: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IdeaServiceService, {provide: getEntityManagerToken(), useValue: entityManagerMock}],
    }).compile();

    service = module.get<IdeaServiceService>(IdeaServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
