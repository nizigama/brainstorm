import { Test, TestingModule } from '@nestjs/testing';
import { Consumer } from './consumer';
import { BrainService } from '../brain/brain.service';

describe('Consumer', () => {
  let service: Consumer;
  let brainServiceMock: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Consumer, {provide: BrainService, useValue: brainServiceMock}],
    }).compile();

    service = module.get<Consumer>(Consumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
