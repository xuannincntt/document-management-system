import { Controller, Post, Body, UseGuards, Request, UseInterceptors, UploadedFiles, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { DocumentsService } from './documents.service';
import { CreateDocumentDto } from './dto/create-document.dto';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MaxFileSizeValidator, ParseFilePipe, FileTypeValidator } from '@nestjs/common';

@Controller('documents')
@UseGuards(JwtAuthGuard, RolesGuard)
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) { }

  @Post()
  @Roles('VAN_THU') // Phân quyền: Chỉ văn thư
  @UseInterceptors(FilesInterceptor('files'))
  async create(
    @UploadedFiles(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 10 }), // 10MB
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
    // req.user.userId lấy từ Passport JWT Strategy
    return this.documentsService.createDraftDocument(dto, req.user.userId, files);
  }
}