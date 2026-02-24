import { Controller, Get } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { Department } from './department.entity';

@Controller('departments')
export class DepartmentsController {
    constructor(
        private readonly departmentsService: DepartmentsService
    ) {}

    @Get()
    async findAll(): Promise<Department[]> {
        return this.departmentsService.findAll();
    }
}
