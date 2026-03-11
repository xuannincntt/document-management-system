import { Test, TestingModule } from '@nestjs/testing';
import { DocumentPermissionsService } from './document-permissions.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { DocumentPermission } from './document-permissions.entity';
import { ConflictException } from '@nestjs/common';

describe('DocumentPermissionsService', () => {
  let service: DocumentPermissionsService;
  let repository: any;

  const mockPermissionRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentPermissionsService,
        {
          provide: getRepositoryToken(DocumentPermission),
          useValue: mockPermissionRepository,
        },
      ],
    }).compile();

    service = module.get<DocumentPermissionsService>(DocumentPermissionsService);
    repository = module.get(getRepositoryToken(DocumentPermission));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllPermissions', () => {
    it('should return all permissions with relations', async () => {
      mockPermissionRepository.find.mockResolvedValue([]);
      await service.getAllPermissions();
      expect(mockPermissionRepository.find).toHaveBeenCalledWith({ relations: ['role', 'status', 'action'] });
    });
  });

  describe('createPermission', () => {
    const createDto = { roleId: 1, statusId: 1, actionId: 1 };

    it('should create permission successfully', async () => {
      mockPermissionRepository.findOne.mockResolvedValue(null);
      mockPermissionRepository.create.mockReturnValue(createDto);
      mockPermissionRepository.save.mockResolvedValue(createDto);

      const result = await service.createPermission(createDto);
      expect(result.message).toBe('Thêm mới quyền thành công!');
      expect(mockPermissionRepository.save).toHaveBeenCalled();
    });

    it('should throw ConflictException if permission already exists', async () => {
      mockPermissionRepository.findOne.mockResolvedValue(createDto);
      await expect(service.createPermission(createDto)).rejects.toThrow(ConflictException);
    });
  });

  describe('deletePermission', () => {
    it('should delete permission successfully', async () => {
      mockPermissionRepository.delete.mockResolvedValue({ affected: 1 });
      const result = await service.deletePermission(1);
      expect(result.message).toBe('Xóa quyền thành công!');
      expect(mockPermissionRepository.delete).toHaveBeenCalledWith(1);
    });
  });

  describe('updatePermission', () => {
    const updateDto = { roleId: 1, statusId: 1, actionId: 2 };

    it('should update permission successfully', async () => {
      mockPermissionRepository.findOne.mockResolvedValue(null);
      mockPermissionRepository.update.mockResolvedValue({ affected: 1 });

      const result = await service.updatePermission(1, updateDto);
      expect(result.message).toBe('Cập nhật quyền thành công!');
      expect(mockPermissionRepository.update).toHaveBeenCalledWith(1, {
        role: { RoleId: updateDto.roleId } as any,
        status: { StatusId: updateDto.statusId } as any,
        action: { actionId: updateDto.actionId } as any,
      });
    });

    it('should throw ConflictException if updated permission conflicts', async () => {
      mockPermissionRepository.findOne.mockResolvedValue(updateDto);
      await expect(service.updatePermission(1, updateDto)).rejects.toThrow(ConflictException);
    });
  });
});
