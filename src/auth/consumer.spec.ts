import { Test, TestingModule } from '@nestjs/testing';
import { Consumer } from './consumer';

describe('Consumer', () => {
  let service: Consumer;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [Consumer],
    }).compile();

    service = module.get<Consumer>(Consumer);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
