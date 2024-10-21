import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { getEntityManagerToken } from '@nestjs/typeorm';
import { BrainService } from '../brain/brain.service';
import { getQueueToken } from '@nestjs/bullmq';
import { UnauthorizedException } from '@nestjs/common';
import { User } from 'src/entities/user.entity';
import * as bcrypt from "bcrypt";

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

  describe('login', () => {
    it('should return user id when credentials are valid', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
      const loginDto = { username: 'testuser', password: 'password123' };

      mockEntityManager.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(true));

      const result = await service.login(loginDto);

      expect(mockEntityManager.findOne).toHaveBeenCalledWith(User, {
        where: { username: loginDto.username }
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
      expect(result).toBe(mockUser.id);
    });

    it('should throw UnauthorizedException when user is not found', async () => {
      const loginDto = { username: 'nonexistent', password: 'password123' };

      mockEntityManager.findOne.mockResolvedValue(undefined);

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(User, {
        where: { username: loginDto.username }
      });
    });

    it('should throw UnauthorizedException when password is invalid', async () => {
      const mockUser = { id: 1, username: 'testuser', password: 'hashedpassword' };
      const loginDto = { username: 'testuser', password: 'wrongpassword' };

      mockEntityManager.findOne.mockResolvedValue(mockUser);
      jest.spyOn(bcrypt, 'compare').mockImplementation(() => Promise.resolve(false));

      await expect(service.login(loginDto)).rejects.toThrow(UnauthorizedException);
      expect(mockEntityManager.findOne).toHaveBeenCalledWith(User, {
        where: { username: loginDto.username }
      });
      expect(bcrypt.compare).toHaveBeenCalledWith(loginDto.password, mockUser.password);
    });
  });
});
