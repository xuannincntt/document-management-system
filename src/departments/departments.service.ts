import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { Repository } from 'typeorm';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Injectable()
export class DepartmentsService {
    constructor(
        @InjectRepository(Department)
        private readonly departmentRepository: Repository<Department>, 
    ) {}
    
    async findAll(): Promise<Department[]> {
        return await this.departmentRepository.find();
    }

    async findOne(id: number): Promise<Department> {
        const department = await this.departmentRepository.findOne({
            where: { DepartmentId: id },
        });
        if (!department) {
            throw new NotFoundException('Department not found');
        }
        return department;
    }

    async update(id: number, dto: UpdateDepartmentDto): Promise<Department> {
        const department = await this.findOne(id);
        Object.assign(department, dto);
        return this.departmentRepository.save(department);
    }

    async remove(id: number): Promise<void> {
        const department = await this.findOne(id);
        await this.departmentRepository.remove(department);
    }

    async create(dto: CreateDepartmentDto): Promise<Department> {
        const department = this.departmentRepository.create(dto);
        return this.departmentRepository.save(department);
    }
}
