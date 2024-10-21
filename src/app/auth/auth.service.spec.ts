import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { BrainService } from '../brain/brain.service';
import { getQueueToken } from '@nestjs/bullmq';

describe('AuthService', () => {
  let service: AuthService;
  let mockEntityManager: any;
  let mockBrainService: any;
  let mockQueue: any;

  beforeEach(async () => {
    mockEntityManager = {
      findOne: jest.fn(),
      create: jest.fn(),
      save: jest.fn(),
    };
    mockBrainService = {};
    mockQueue = {
      add: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: getEntityManagerToken(), useValue: mockEntityManager },
        { provide: BrainService, useValue: mockBrainService },
        { provide: getQueueToken('default-queue'), useValue: mockQueue },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
