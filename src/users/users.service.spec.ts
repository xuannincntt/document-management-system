import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  let userRepository: any;

  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    userRepository = module.get(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const users = [{ UserId: 1, Username: 'user1' }] as User[];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.findAll();
      expect(result).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe('getAllUsers', () => {
    it('should return users with relations', async () => {
      const users = [{ UserId: 1, Username: 'user1' }] as User[];
      mockUserRepository.find.mockResolvedValue(users);

      const result = await service.getAllUsers();
      expect(result).toEqual(users);
      expect(mockUserRepository.find).toHaveBeenCalledWith({ relations: ['role', 'status'] });
    });
  });

  describe('updateUserRole', () => {
    it('should update user role successfully', async () => {
      const user = { UserId: 1, RoleId: 1 } as User;
      mockUserRepository.findOne.mockResolvedValue(user);
      mockUserRepository.save.mockResolvedValue({ ...user, RoleId: 2 });

      const result = await service.updateUserRole(1, 2);
      expect(result).toEqual({ message: 'Cập nhật phân quyền thành công!' });
      expect(user.RoleId).toBe(2);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });

    it('should throw NotFoundException if user not found', async () => {
      mockUserRepository.findOne.mockResolvedValue(null);
      await expect(service.updateUserRole(1, 2)).rejects.toThrow(NotFoundException);
    });
  });

  describe('blockUser', () => {
    it('should block user successfully', async () => {
      const user = { UserId: 1, IsActive: true } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.blockUser(1);
      expect(result).toEqual({ message: 'Khóa tài khoản người dùng thành công!' });
      expect(user.IsActive).toBe(false);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('unblockUser', () => {
    it('should unblock user successfully', async () => {
      const user = { UserId: 1, IsActive: false } as User;
      mockUserRepository.findOne.mockResolvedValue(user);

      const result = await service.unblockUser(1);
      expect(result).toEqual({ message: 'Mở khóa tài khoản người dùng thành công!' });
      expect(user.IsActive).toBe(true);
      expect(mockUserRepository.save).toHaveBeenCalledWith(user);
    });
  });

  describe('deleteUser', () => {
    it('should delete user successfully', async () => {
      mockUserRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.deleteUser(1);
      expect(result).toEqual({ message: 'Xóa tài khoản người dùng thành công!' });
      expect(mockUserRepository.delete).toHaveBeenCalledWith(1);
    });
  });
});
