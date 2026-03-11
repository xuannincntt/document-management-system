import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto, UpdateRoleDto } from './dto/role.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Roles')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) { }

    @Post()
    @ApiOperation({ summary: 'Tạo vai trò mới' })
    @ApiResponse({ status: 201, description: 'Tạo thành công' })
    async create(@Body() createRoleDto: CreateRoleDto) {
        return await this.rolesService.create(createRoleDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách vai trò' })
    async findAll() {
        return await this.rolesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin vai trò theo ID' })
    async findOne(@Param('id') id: string) {
        return await this.rolesService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Cập nhật vai trò' })
    async update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
        return await this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa vai trò' })
    async remove(@Param('id') id: string) {
        return await this.rolesService.remove(+id);
    }
}
