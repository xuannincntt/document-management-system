import { Controller, Get, Post, Body, Param, Delete, UseGuards } from '@nestjs/common';
import { AccountPermissionsService } from './account-permissions.service';
import { CreateAccountPermissionDto } from './dto/account-permission.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Account Permissions')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Controller('account-permissions')
export class AccountPermissionsController {
    constructor(private readonly permissionsService: AccountPermissionsService) { }

    @Post()
    @ApiOperation({ summary: 'Gán hàng loạt quyền cho danh sách người dùng' })
    @ApiResponse({ status: 201, description: 'Gán thành công' })
    async create(@Body() createDto: CreateAccountPermissionDto) {
        return await this.permissionsService.create(createDto);
    }

    @Get('user/:userId')
    @ApiOperation({ summary: 'Lấy danh sách quyền của một người dùng' })
    async getByUser(@Param('userId') userId: string) {
        return await this.permissionsService.getPermissionsByUser(+userId);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa quyền hạn' })
    async remove(@Param('id') id: string) {
        return await this.permissionsService.remove(+id);
    }
}
