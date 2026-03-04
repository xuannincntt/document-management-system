import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUsersService = {
    getAllUsers: jest.fn(),
    updateUserRole: jest.fn(),
    deleteUser: jest.fn(),
    blockUser: jest.fn(),
    unblockUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllUsers', () => {
    it('should call usersService.getAllUsers', async () => {
      mockUsersService.getAllUsers.mockResolvedValue([]);
      await controller.getAllUsers();
      expect(mockUsersService.getAllUsers).toHaveBeenCalled();
    });
  });

  describe('assignRole', () => {
    it('should call usersService.updateUserRole', async () => {
      mockUsersService.updateUserRole.mockResolvedValue({ message: 'Success' });
      await controller.assignRole(1, 2);
      expect(mockUsersService.updateUserRole).toHaveBeenCalledWith(1, 2);
    });
  });

  describe('deleteUser', () => {
    it('should call usersService.deleteUser', async () => {
      mockUsersService.deleteUser.mockResolvedValue({ message: 'Success' });
      await controller.deleteUser(1);
      expect(mockUsersService.deleteUser).toHaveBeenCalledWith(1);
    });
  });

  describe('blockUser', () => {
    it('should call usersService.blockUser', async () => {
      mockUsersService.blockUser.mockResolvedValue({ message: 'Success' });
      await controller.blockUser(1);
      expect(mockUsersService.blockUser).toHaveBeenCalledWith(1);
    });
  });

  describe('unblockUser', () => {
    it('should call usersService.unblockUser', async () => {
      mockUsersService.unblockUser.mockResolvedValue({ message: 'Success' });
      await controller.unblockUser(1);
      expect(mockUsersService.unblockUser).toHaveBeenCalledWith(1);
    });
  });
});
