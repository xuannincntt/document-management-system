import { Body, Controller, Get, Param, Post, Query, UseGuards, Patch, Delete, ParseIntPipe, Req } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { UpdateUsersDto } from './dto/update-users.dto';
import { UpdateProfileDto, ChangePasswordDto } from './dto/update-profile.dto';
import { SearchUserDto } from './dto/search-user.dto';
import { AccountPermissionGuard } from '../account-permissions/guards/account-permission.guard';
import { AccountPermission } from '../account-permissions/decorators/account-permission.decorator';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiParam } from '@nestjs/swagger';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard, AccountPermissionGuard)
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }

    @Get('profile')
    @ApiOperation({ summary: 'Lấy thông tin cá nhân của người dùng hiện tại' })
    @ApiResponse({ status: 200, description: 'Thông tin cá nhân' })
    async getProfile(@Req() req) {
        return this.usersService.getUserById(req.user.userId);
    }

    @Patch('profile')
    @ApiOperation({ summary: 'Cập nhật thông tin cá nhân' })
    @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
    async updateProfile(@Req() req, @Body() data: UpdateProfileDto) {
        return this.usersService.updateProfile(req.user.userId, data);
    }

    @Patch('change-password')
    @ApiOperation({ summary: 'Đổi mật khẩu' })
    @ApiResponse({ status: 200, description: 'Đổi mật khẩu thành công' })
    async changePassword(@Req() req, @Body() data: ChangePasswordDto) {
        return this.usersService.changePassword(req.user.userId, data);
    }

    @Get()
    @AccountPermission('READ')
    @ApiOperation({ summary: 'Lấy danh sách tất cả người dùng hoặc tìm kiếm theo tên' })
    @ApiResponse({ status: 200, description: 'Danh sách người dùng' })
    async getAllUsers(@Query('fullName') fullName?: string) {
        return this.usersService.getAllUsers(fullName);
    }

    @Get(':id')
    @AccountPermission('READ')
    @ApiOperation({ summary: 'Lấy thông tin người dùng theo ID' })
    @ApiParam({ name: 'id', description: 'ID của người dùng' })
    @ApiResponse({ status: 200, description: 'Thông tin chi tiết người dùng' })
    @ApiResponse({ status: 404, description: 'Không tìm thấy người dùng' })
    async getUserById(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.getUserById(userId);
    }

    @Patch(':id')
    @AccountPermission('UPDATE')
    @ApiOperation({ summary: 'Cập nhật thông tin người dùng' })
    @ApiParam({ name: 'id', description: 'ID của người dùng cần cập nhật' })
    @ApiResponse({ status: 200, description: 'Cập nhật thành công' })
    async updateUser(
        @Param('id', ParseIntPipe) userId: number,
        @Body() updateData: UpdateUsersDto
    ) {
        return this.usersService.updateUser(userId, updateData);
    }

    @Patch(':id/role')
    @AccountPermission('UPDATE')
    @ApiOperation({ summary: 'Gán vai trò cho người dùng' })
    @ApiParam({ name: 'id', description: 'ID của người dùng' })
    @ApiResponse({ status: 200, description: 'Gán vai trò thành công' })
    async assignRole(
        @Param('id', ParseIntPipe) userId: number,
        @Body('roleId') newRoleId: number
    ) {
        return this.usersService.updateUserRole(userId, newRoleId);
    }

    @Delete(':id')
    @AccountPermission('DELETE')
    @ApiOperation({ summary: 'Xóa người dùng' })
    @ApiParam({ name: 'id', description: 'ID của người dùng cần xóa' })
    @ApiResponse({ status: 200, description: 'Xóa thành công' })
    async deleteUser(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.deleteUser(userId);
    }

    @Patch(':id/block')
    @AccountPermission('BLOCK')
    @ApiOperation({ summary: 'Khóa tài khoản người dùng' })
    @ApiParam({ name: 'id', description: 'ID của người dùng cần khóa' })
    @ApiResponse({ status: 200, description: 'Khóa thành công' })
    async blockUser(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.blockUser(userId);
    }

    @Patch(':id/unblock')
    @AccountPermission('UNBLOCK')
    @ApiOperation({ summary: 'Mở khóa tài khoản người dùng' })
    @ApiParam({ name: 'id', description: 'ID của người dùng cần mở khóa' })
    @ApiResponse({ status: 200, description: 'Mở khóa thành công' })
    async unblockUser(@Param('id', ParseIntPipe) userId: number) {
        return this.usersService.unblockUser(userId);
    }
}
