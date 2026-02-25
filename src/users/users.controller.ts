import { Body, Controller, Get, Param, Post, Query, UseGuards, Patch } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthService } from 'src/auth/auth.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';

@Controller('users')
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService,
    ) { }
    @UseGuards(AuthGuard('jwt'), RolesGuard)
    @Roles('ADMIN')
    @Patch(':id/role')
    async assignRole(
        @Param('id') userId: number,
        @Body('roleId') newRoleId: number
    ) {
        return this.usersService.updateUserRole(userId, newRoleId);
    }
}
