import { Test, TestingModule } from '@nestjs/testing';
import { DepartmentsService } from './departments.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { NotFoundException } from '@nestjs/common';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

describe('DepartmentsService', () => {
  let service: DepartmentsService;
  let repository: Repository<Department>;

  const mockDepartmentRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DepartmentsService,
        {
          provide: getRepositoryToken(Department),
          useValue: mockDepartmentRepository,
        },
      ],
    }).compile();

    service = module.get<DepartmentsService>(DepartmentsService);
    repository = module.get<Repository<Department>>(getRepositoryToken(Department));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of departments', async () => {
      const departments = [{ DepartmentId: 1, DepartmentName: 'IT' }] as Department[];
      mockDepartmentRepository.find.mockResolvedValue(departments);

      const result = await service.findAll();
      expect(result).toEqual(departments);
      expect(mockDepartmentRepository.find).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a department if found', async () => {
      const department = { DepartmentId: 1, DepartmentName: 'IT' } as Department;
      mockDepartmentRepository.findOne.mockResolvedValue(department);

      const result = await service.findOne(1);
      expect(result).toEqual(department);
      expect(mockDepartmentRepository.findOne).toHaveBeenCalledWith({ where: { DepartmentId: 1 } });
    });

    it('should throw NotFoundException if department not found', async () => {
      mockDepartmentRepository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and save a new department', async () => {
      const dto: CreateDepartmentDto = { DepartmentName: 'HR', Description: 'Human Resources' };
      const department = { DepartmentId: 2, ...dto } as Department;

      mockDepartmentRepository.create.mockReturnValue(department);
      mockDepartmentRepository.save.mockResolvedValue(department);

      const result = await service.create(dto);
      expect(result).toEqual(department);
      expect(mockDepartmentRepository.create).toHaveBeenCalledWith(dto);
      expect(mockDepartmentRepository.save).toHaveBeenCalledWith(department);
    });
  });

  describe('update', () => {
    it('should update and save a department', async () => {
      const id = 1;
      const dto: UpdateDepartmentDto = { DepartmentName: 'Information Technology' };
      const existingDepartment = { DepartmentId: id, DepartmentName: 'IT' } as Department;
      const updatedDepartment = { ...existingDepartment, ...dto };

      jest.spyOn(service, 'findOne').mockResolvedValue(existingDepartment);
      mockDepartmentRepository.save.mockResolvedValue(updatedDepartment);

      const result = await service.update(id, dto);
      expect(result).toEqual(updatedDepartment);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(mockDepartmentRepository.save).toHaveBeenCalledWith(updatedDepartment);
    });
  });

  describe('remove', () => {
    it('should remove a department', async () => {
      const id = 1;
      const department = { DepartmentId: id, DepartmentName: 'IT' } as Department;

      jest.spyOn(service, 'findOne').mockResolvedValue(department);
      mockDepartmentRepository.remove.mockResolvedValue(undefined);

      await service.remove(id);
      expect(service.findOne).toHaveBeenCalledWith(id);
      expect(mockDepartmentRepository.remove).toHaveBeenCalledWith(department);
    });
  });
});
