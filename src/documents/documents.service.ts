import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, DeepPartial } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { Document } from './documents.entity';
import { DocumentHistory } from '../document-histories/document-histories.entity';
import { DocumentAttachment } from '../document-attachments/document-attachments.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  constructor(private dataSource: DataSource, private cloudinaryService: CloudinaryService) { }

  async createDraftDocument(createDto: CreateDocumentDto, userId: number, files: Express.Multer.File[]) {
    const uploadedFilesInfo: { public_id: string; url: string; name: string }[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      if (files && files.length > 0) {
        for (const file of files) {
          const res = await this.cloudinaryService.uploadFile(file);
          const fileNameOnly = path.parse(file.originalname).name;
          uploadedFilesInfo.push({
            public_id: res.public_id,
            url: res.secure_url,
            name: fileNameOnly,
          });
        }
      }
      const docData: DeepPartial<Document> = {
        title: createDto.title,
        content: createDto.content,
        createdBy: { UserId: userId },
        status: { StatusCode: 'DRAFT' }
      };
      const newDoc = queryRunner.manager.create(Document, docData);
      const savedDoc = await queryRunner.manager.save(newDoc);
      const historyData: DeepPartial<DocumentHistory> = {
        document: { documentId: savedDoc.documentId },
        actionBy: { UserId: userId },
        actionType: 'CREATE_DRAFT',
        note: 'Văn thư khởi tạo văn bản nháp trên hệ thống',
      };
      const history = queryRunner.manager.create(DocumentHistory, historyData);
      await queryRunner.manager.save(history);
      if (uploadedFilesInfo.length > 0) {
        const attachmentEntities = uploadedFilesInfo.map(f => ({
          document: { documentId: savedDoc.documentId },
          fileName: f.name,
          filePath: f.url,
        }));
        await queryRunner.manager.insert(DocumentAttachment, attachmentEntities);
      }
      await queryRunner.commitTransaction();
      return {
        message: 'Tạo văn bản nháp thành công!',
        documentId: savedDoc.documentId,
        attachments: uploadedFilesInfo,
      };
    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (uploadedFilesInfo.length > 0) {
        await Promise.all(uploadedFilesInfo.map(f => this.cloudinaryService.deleteFile(f.public_id)));
      }
      throw new InternalServerErrorException('Quy trình thất bại: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }
}