import { Test, TestingModule } from '@nestjs/testing';
import { WorkflowPermissionsController } from './workflow-permissions.controller';
import { WorkflowPermissionsService } from './workflow-permissions.service';
import { AuthGuard } from '@nestjs/passport';

describe('WorkflowPermissionsController', () => {
  let controller: WorkflowPermissionsController;
  let service: WorkflowPermissionsService;

  const mockService = {
    createPermission: jest.fn(),
    getAllPermissions: jest.fn(),
    deletePermission: jest.fn(),
    updatePermission: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WorkflowPermissionsController],
      providers: [
        {
          provide: WorkflowPermissionsService,
          useValue: mockService,
        },
      ],
    })
      .overrideGuard(AuthGuard('jwt'))
      .useValue({ canActivate: () => true })
      .compile();

    controller = module.get<WorkflowPermissionsController>(WorkflowPermissionsController);
    service = module.get<WorkflowPermissionsService>(WorkflowPermissionsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.createPermission', async () => {
      const dto = { roleId: 1, statusId: 1, allowedAction: 'READ' };
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
      const dto = { roleId: 1, statusId: 1, allowedAction: 'UPDATE' };
      await controller.updatePermission(1, dto);
      expect(mockService.updatePermission).toHaveBeenCalledWith(1, dto);
    });
  });
});
