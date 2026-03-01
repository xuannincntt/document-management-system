import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { UpdateDepartmentDto } from './dto/update-department.dto';

@Controller('departments')
export class DepartmentsController {
    constructor(
        private readonly departmentsService: DepartmentsService
    ) {}

    @Get()
    finAll() {
        return this.departmentsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.departmentsService.findOne(id);
    }

    @Patch(':id')
        update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateDepartmentDto,
    ) {
        return this.departmentsService.update(id, dto);
    }

    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.departmentsService.remove(id);
    }
}
