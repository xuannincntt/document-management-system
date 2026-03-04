import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsController } from './departments.controller';
import { DepartmentsService } from './departments.service';
import { Department } from './department.entity';
import { UpdateDepartmentDto } from './dto/update-department.dto';

describe('DepartmentsController', () => {
  let controller: DepartmentsController;
  let service: DepartmentsService;

  const mockDepartmentsService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DepartmentsController],
      providers: [
        {
          provide: DepartmentsService,
          useValue: mockDepartmentsService,
        },
      ],
    }).compile();

    controller = module.get<DepartmentsController>(DepartmentsController);
    service = module.get<DepartmentsService>(DepartmentsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('finAll', () => {
    it('should return an array of departments', async () => {
      const departments = [{ DepartmentId: 1, DepartmentName: 'IT' }] as Department[];
      mockDepartmentsService.findAll.mockResolvedValue(departments);

      const result = await controller.finAll();
      expect(result).toEqual(departments);
      expect(mockDepartmentsService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a department', async () => {
      const department = { DepartmentId: 1, DepartmentName: 'IT' } as Department;
      mockDepartmentsService.findOne.mockResolvedValue(department);

      const result = await controller.findOne(1);
      expect(result).toEqual(department);
      expect(mockDepartmentsService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return a department', async () => {
      const id = 1;
      const dto: UpdateDepartmentDto = { DepartmentName: 'Information Technology' };
      const updatedDepartment = { DepartmentId: id, ...dto } as Department;

      mockDepartmentsService.update.mockResolvedValue(updatedDepartment);

      const result = await controller.update(id, dto);
      expect(result).toEqual(updatedDepartment);
      expect(mockDepartmentsService.update).toHaveBeenCalledWith(id, dto);
    });
  });

  describe('remove', () => {
    it('should remove a department', async () => {
      const id = 1;
      mockDepartmentsService.remove.mockResolvedValue(undefined);

      await controller.remove(id);
      expect(mockDepartmentsService.remove).toHaveBeenCalledWith(id);
    });
  });
});
