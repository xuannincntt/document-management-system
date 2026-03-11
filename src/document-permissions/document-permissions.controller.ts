import { Controller, Post, Body, UseGuards, Get, Delete, Param, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { DocumentPermissionsService } from './document-permissions.service';
import { CreateDocumentPermissionDto } from './dto/create-document-permission.dto';

@Controller('document-permissions')
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
export class DocumentPermissionsController {
  constructor(private readonly documentPermissionsService: DocumentPermissionsService) {}
  @Post()
  async create(@Body() createDto: CreateDocumentPermissionDto) {
      return this.documentPermissionsService.createPermission(createDto);
  }
  @Get()
  async getAllPermissions() {
      return this.documentPermissionsService.getAllPermissions();
  }
  @Delete(':id')
  async deletePermission(@Param('id') id: number) {
      return this.documentPermissionsService.deletePermission(id);
  }
  @Put(':id')
  async updatePermission(@Param('id') id: number, @Body() updateDto: CreateDocumentPermissionDto) {
      return this.documentPermissionsService.updatePermission(id, updateDto);
  }
}