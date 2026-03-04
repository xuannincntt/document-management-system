import { Body, Controller, Get, Param, Post, Query, UseGuards, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@Controller('users')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
    ) { }
    @Get()
    async getAllUsers() {
        return this.usersService.getAllUsers();
    }
    @Patch(':id/update')
    async assignRole(
        @Param('id') userId: number,
        @Body('roleId') newRoleId: number
    ) {
        return this.usersService.updateUserRole(userId, newRoleId);
    }
    @Delete(':id')
    async deleteUser(@Param('id') userId: number) {
        return this.usersService.deleteUser(userId);
    }
    @Patch(':id/block')
    async blockUser(@Param('id') userId: number) {
        return this.usersService.blockUser(userId);
    }
    @Patch(':id/unblock')
    async unblockUser(@Param('id') userId: number) {
        return this.usersService.unblockUser(userId);
    }
}
