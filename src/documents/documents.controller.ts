import { Controller, Post, Body, UseGuards, Request, UseInterceptors, UploadedFiles, Req, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MaxFileSizeValidator, ParseFilePipe, FileTypeValidator } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth, ApiConsumes, ApiBody, ApiParam } from '@nestjs/swagger';

@ApiTags('Documents')
@ApiBearerAuth()
@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  @Post()
  @Roles('VAN_THU')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Tạo văn bản mởi (nháp) kèm tệp đính kèm' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Tiêu đề văn bản' },
        content: { type: 'string', description: 'Nội dung văn bản' },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Danh sách tệp đính kèm',
        },
      },
      required: ['title'],
    },
  })
  @ApiResponse({ status: 201, description: 'Văn bản đã được tạo thành công' })
  async create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
    @Body() dto: CreateDocumentDto,
    @Req() req,
  ) {
    return this.documentsService.createDraftDocment(dto, req.user.userId, req.user.roleCode, files);
  }

  @Patch(':id')
  @UseInterceptors(FilesInterceptor('files'))
  @ApiConsumes('multipart/form-data')
  @ApiOperation({ summary: 'Cập nhật thông tin văn bản và tệp đính kèm' })
  @ApiParam({ name: 'id', description: 'ID của văn bản cần cập nhật' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        title: { type: 'string', description: 'Tiêu đề văn bản' },
        content: { type: 'string', description: 'Nội dung văn bản' },
        files: {
          type: 'array',
          items: {
            type: 'string',
            format: 'binary',
          },
          description: 'Danh sách tệp đính kèm mới (nếu có)',
        },
      },
    },
  })
  @ApiResponse({ status: 200, description: 'Cập nhật văn bản thành công' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|pdf|msword|vnd.openxmlformats-officedocument.wordprocessingml.document)$/,
          }),
        ],
        fileIsRequired: false,
      }),
    )
    files: Express.Multer.File[],
    @Body() dto: UpdateDocumentDto,
    @Req() req,
  ) {
    return this.documentsService.updateDocument(id, dto, req.user.userId, req.user.roleCode, files);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Xóa văn bản' })
  @ApiParam({ name: 'id', description: 'ID của văn bản cần xóa' })
  @ApiResponse({ status: 200, description: 'Xóa văn bản thành công' })
  async remove(@Param('id', ParseIntPipe) id: number, @Req() req) {
    return this.documentsService.deleteDocument(id, req.user.userId, req.user.roleCode);
  }
}
