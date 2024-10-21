import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';


describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: any;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        { provide: AuthService, useValue: mockAuthService }
      ]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    let mockAuthService: jest.Mocked<AuthService>;
    let mockSession: Record<string, any>;

    beforeEach(() => {
      mockAuthService = {
        register: jest.fn(),
      } as any;
      controller = new AuthController(mockAuthService);
      mockSession = {};
    });


    it('should call AuthService.register with correct parameters', async () => {
      const registerDto = { username: 'testuser', password: 'password123', password_confirm: 'password123' };
      await controller.register(registerDto, mockSession);
      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should set session variables upon successful registration', async () => {
      const userId = 1;
      mockAuthService.register.mockResolvedValue(userId);
      const registerDto = { username: 'testuser', password: 'password123', password_confirm: 'password123' };

      await controller.register(registerDto, mockSession);

      expect(mockSession.isAuthenticated).toBe("yes");
      expect(mockSession.userId).toBe(userId);
    });

    it('should return a success message upon successful registration', async () => {
      mockAuthService.register.mockResolvedValue(1);
      const registerDto = { username: 'testuser', password: 'password123', password_confirm: 'password123' };

      const result = await controller.register(registerDto, mockSession);

      expect(result).toEqual({ message: "Registration successful" });
    });

    it('should throw an error if AuthService.register throws an error', async () => {
      const errorMessage = 'Registration failed';
      mockAuthService.register.mockRejectedValue(new Error(errorMessage));
      const registerDto = { username: 'testuser', password: 'password123', password_confirm: 'password123' };

      await expect(controller.register(registerDto, mockSession)).rejects.toThrow(errorMessage);
    });
  });
});
