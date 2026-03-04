import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let service: AuthService;

  const mockAuthService = {
    register: jest.fn(),
    login: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('should call authService.register', async () => {
      const dto = { username: 'test', password: 'password', fullName: 'Test', email: 'test@test.com', departmentId: 1 };
      mockAuthService.register.mockResolvedValue({ message: 'Success' });

      const result = await controller.register(dto);
      expect(result).toEqual({ message: 'Success' });
      expect(mockAuthService.register).toHaveBeenCalledWith(dto);
    });
  });

  describe('login', () => {
    it('should call authService.login', async () => {
      const dto = { username: 'test', password: 'password' };
      mockAuthService.login.mockResolvedValue({ accessToken: 'token' });

      const result = await controller.login(dto);
      expect(result).toEqual({ accessToken: 'token' });
      expect(mockAuthService.login).toHaveBeenCalledWith(dto);
    });
  });
});
