import { Controller, Post, Body, UseGuards, Get, Delete, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { WorkflowPermissionsService } from './workflow-permissions.service';
import { CreateWorkflowPermissionDto } from './dto/create-workflow-permission.dto';

@Controller('workflow-permissions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
export class WorkflowPermissionsController {
  constructor(private readonly workflowPermissionsService: WorkflowPermissionsService) {}
  @Post()
  async create(@Body() createDto: CreateWorkflowPermissionDto) {
      return this.workflowPermissionsService.createPermission(createDto);
  }
  @Get()
  async getAllPermissions() {
      return this.workflowPermissionsService.getAllPermissions();
  }
  @Delete(':id')
  async deletePermission(@Param('id') id: number) {
      return this.workflowPermissionsService.deletePermission(id);
  }
  @Put(':id')
  async updatePermission(@Param('id') id: number, @Body() updateDto: CreateWorkflowPermissionDto) {
      return this.workflowPermissionsService.updatePermission(id, updateDto);
  }
}