import { Test, TestingModule } from '@nestjs/testing';
import { ConsumerService } from './consumer.service';
import { BrainService } from '../brain/brain.service';
import { getEntityManagerToken } from '@nestjs/typeorm';

describe('ConsumerService', () => {
  let service: ConsumerService;
  let brainServiceMock: any
  let entityManagerMock: any

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConsumerService, { provide: BrainService, useValue: brainServiceMock }, {provide: getEntityManagerToken(), useValue: entityManagerMock}],
    }).compile();

    service = module.get<ConsumerService>(ConsumerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
