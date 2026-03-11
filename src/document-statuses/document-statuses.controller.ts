import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { DocumentStatusesService } from './document-statuses.service';
import { CreateDocumentStatusDto, UpdateDocumentStatusDto } from './dto/document-status.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Document Statuses')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'), RolesGuard)
@Roles('ADMIN')
@Controller('document-statuses')
export class DocumentStatusesController {
    constructor(private readonly statusesService: DocumentStatusesService) { }

    @Post()
    @ApiOperation({ summary: 'Tạo trạng thái văn bản mới' })
    @ApiResponse({ status: 201, description: 'Tạo thành công' })
    async create(@Body() createDto: CreateDocumentStatusDto) {
        return await this.statusesService.create(createDto);
    }

    @Get()
    @ApiOperation({ summary: 'Lấy danh sách trạng thái văn bản' })
    async findAll() {
        return await this.statusesService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Lấy thông tin trạng thái theo ID' })
    async findOne(@Param('id') id: string) {
        return await this.statusesService.findOne(+id);
    }

    @Patch(':id')
    @ApiOperation({ summary: 'Cập nhật trạng thái văn bản' })
    async update(@Param('id') id: string, @Body() updateDto: UpdateDocumentStatusDto) {
        return await this.statusesService.update(+id, updateDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Xóa trạng thái văn bản' })
    async remove(@Param('id') id: string) {
        return await this.statusesService.remove(+id);
    }
}
