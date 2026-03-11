import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards } from '@nestjs/common';
import { DepartmentsService } from './departments.service';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';

@ApiTags('Departments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('departments')
export class DepartmentsController {
    constructor(
        private readonly departmentsService: DepartmentsService
    ) { }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách tất cả phòng ban' })
    @ApiResponse({ status: 200, description: 'Danh sách phòng ban' })
    finAll() {
        return this.departmentsService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin phòng ban theo ID' })
    @ApiParam({ name: 'id', description: 'ID của phòng ban' })
    @ApiResponse({ status: 200, description: 'Thông tin chi tiết phòng ban' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy phòng ban' })
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.departmentsService.findOne(id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Cập nhật thông tin phòng ban' })
    @ApiParam({ name: 'id', description: 'ID của phòng ban cần cập nhật' })
    @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() dto: UpdateDepartmentDto,
    ) {
        return this.departmentsService.update(id, dto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa phòng ban' })
    @ApiParam({ name: 'id', description: 'ID của phòng ban cần xóa' })
    @ApiResponse({ status: 200, description: 'Xóa thành công' })
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.departmentsService.remove(id);
    }

    @Post()
    @ApiOperation({ summary: 'Tạo phòng ban mới' })
    @ApiResponse({ status: 201, description: 'Tạo thành công' })
    create(@Body() dto: CreateDepartmentDto) {
        return this.departmentsService.create(dto);
    }
}
