import { Test, TestingModule } from '@nestjs/testing';
import { DocumentPermissionsController } from './document-permissions.controller';
import { DocumentPermissionsService } from './document-permissions.service';
import { AuthGuard } from '@nestjs/passport';

describe('DocumentPermissionsController', () => {
  let controller: DocumentPermissionsController;
  let service: DocumentPermissionsService;

  const mockService = {
    createPermission: jest.fn(),
    getAllPermissions: jest.fn(),
    deletePermission: jest.fn(),
    updatePermission: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DocumentPermissionsController],
      providers: [
        {
          provide: DocumentPermissionsService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<DocumentPermissionsController>(DocumentPermissionsController);
    service = module.get<DocumentPermissionsService>(DocumentPermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.createPermission', async () => {
      const dto = { roleId: 1, statusId: 1, actionId: 1 };
      await controller.create(dto);
      expect(mockService.createPermission).toHaveBeenCalledWith(dto);
    });
  });

  describe('getAllPermissions', () => {
    it('should call service.getAllPermissions', async () => {
      await controller.getAllPermissions();
      expect(mockService.getAllPermissions).toHaveBeenCalled();
    });
  });

  describe('deletePermission', () => {
    it('should call service.deletePermission', async () => {
      await controller.deletePermission(1);
      expect(mockService.deletePermission).toHaveBeenCalledWith(1);
    });
  });

  describe('updatePermission', () => {
    it('should call service.updatePermission', async () => {
      const dto = { roleId: 1, statusId: 1, actionId: 2 };
      await controller.updatePermission(1, dto);
      expect(mockService.updatePermission).toHaveBeenCalledWith(1, dto);
    });
  });
});
