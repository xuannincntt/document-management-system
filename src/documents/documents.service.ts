import { Injectable, InternalServerErrorException, NotFoundException, ForbiddenException } from '@nestjs/common';
import { DataSource, DeepPartial } from 'typeorm';
import { CreateDocumentDto } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Document } from './documents.entity';
import { DocumentHistory } from '../document-histories/document-histories.entity';
import { DocumentAttachment } from '../document-attachments/document-attachments.entity';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { DocumentPermission } from '../document-permissions/document-permissions.entity';
import { DocumentStatus } from '../document-statuses/document-statuses.entity';
import { Role } from '../roles/role.entity';
import * as path from 'path';

@Injectable()
export class DocumentsService {
  constructor(private dataSource: DataSource, private cloudinaryService: CloudinaryService) { }

  private async checkPermission(queryRunner: any, roleCode: string, statusId: number, actionCode: string) {
    const role = await queryRunner.manager.findOne(Role, { where: { RoleCode: roleCode } });
    if (!role) throw new ForbiddenException('Không tìm thấy vai trò người dùng!');

    const permission = await queryRunner.manager.findOne(DocumentPermission, {
      where: {
        role: { RoleId: role.RoleId },
        status: { StatusId: statusId },
        action: { actionCode: actionCode }
      },
      relations: ['action']
    });

    if (!permission) {
      throw new ForbiddenException(`Bạn không có quyền thực hiện hành động ${actionCode} ở trạng thái hiện tại!`);
    }
  }

  async createDraftDocment(createDto: CreateDocumentDto, userId: number, roleCode: string, files: Express.Multer.File[]) {
    const uploadedFilesInfo: { public_id: string; url: string; name: string }[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      // Get DRAFT status
      const draftStatus = await queryRunner.manager.findOne(DocumentStatus, { where: { StatusCode: 'DRAFT' } });
      if (!draftStatus) throw new InternalServerErrorException('Hệ thống chưa cấu hình trạng thái DRAFT');

      // 1. Check permission dynamic for 'CREATE' action in 'DRAFT' status
      await this.checkPermission(queryRunner, roleCode, draftStatus.StatusId, 'CREATE');

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
        sender: { UserId: userId },
        receiver: createDto.receiverId ? { UserId: createDto.receiverId } : undefined,
        status: { StatusId: draftStatus.StatusId }
      };
      const newDoc = queryRunner.manager.create(Document, docData);
      const savedDoc = await queryRunner.manager.save(newDoc);

      const historyData: DeepPartial<DocumentHistory> = {
        document: { documentId: savedDoc.documentId },
        sender: { UserId: userId },
        receiver: createDto.receiverId ? { UserId: createDto.receiverId } : undefined,
        actionType: 'CREATE_DRAFT',
        note: `Người dùng khởi tạo văn bản nháp. Role: ${roleCode}`,
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
      throw error instanceof ForbiddenException || error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Quy trình thất bại: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async updateDocument(documentId: number, updateDto: UpdateDocumentDto, userId: number, roleCode: string, files: Express.Multer.File[]) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    const uploadedFilesInfo: { public_id: string; url: string; name: string }[] = [];

    try {
      const document = await queryRunner.manager.findOne(Document, {
        where: { documentId },
        relations: ['status', 'sender', 'receiver']
      });

      if (!document) throw new NotFoundException('Không tìm thấy văn bản!');

      // Check permission based on workflow action code 'UPDATE'
      await this.checkPermission(queryRunner, roleCode, document.status.StatusId, 'UPDATE');

      // If files are provided, we might want to handle them (e.g., replace or add)
      // For simplicity, let's assume we add new ones here. 
      // In a real scenario, you might want a separate logic for deleting old ones.
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

      // Update basic fields
      if (updateDto.title) document.title = updateDto.title;
      if (updateDto.content) document.content = updateDto.content;

      await queryRunner.manager.save(document);

      // Save History
      const historyData: DeepPartial<DocumentHistory> = {
        document: { documentId: document.documentId },
        sender: { UserId: userId },
        receiver: document.receiver ? { UserId: document.receiver.UserId } : undefined,
        actionType: 'UPDATE',
        note: `Người dùng cập nhật nội dung văn bản. Action: UPDATE, Role: ${roleCode}`,
      };
      const history = queryRunner.manager.create(DocumentHistory, historyData);
      await queryRunner.manager.save(history);

      // Save new attachments if any
      if (uploadedFilesInfo.length > 0) {
        const attachmentEntities = uploadedFilesInfo.map(f => ({
          document: { documentId: document.documentId },
          fileName: f.name,
          filePath: f.url,
        }));
        await queryRunner.manager.insert(DocumentAttachment, attachmentEntities);
      }

      await queryRunner.commitTransaction();
      return {
        message: 'Cập nhật văn bản thành công!',
        documentId: document.documentId,
        attachments: uploadedFilesInfo,
      };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      if (uploadedFilesInfo.length > 0) {
        await Promise.all(uploadedFilesInfo.map(f => this.cloudinaryService.deleteFile(f.public_id)));
      }
      throw error instanceof ForbiddenException || error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Cập nhật thất bại: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }

  async deleteDocument(documentId: number, userId: number, roleCode: string) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const document = await queryRunner.manager.findOne(Document, {
        where: { documentId },
        relations: ['status']
      });

      if (!document) throw new NotFoundException('Không tìm thấy văn bản!');

      // Check permission based on workflow action code 'DELETE'
      await this.checkPermission(queryRunner, roleCode, document.status.StatusId, 'DELETE');

      // Potential Cloudinary cleanup would go here if we had the public_ids. 
      // For now, let's proceed with DB deletion.

      // Delete attachments first (due to FK or cascading if set, but let's be explicit if not)
      await queryRunner.manager.delete(DocumentAttachment, { document: { documentId } });

      // Delete history
      await queryRunner.manager.delete(DocumentHistory, { document: { documentId } });

      // Delete document
      await queryRunner.manager.delete(Document, documentId);

      await queryRunner.commitTransaction();
      return { message: 'Xóa văn bản thành công!' };

    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error instanceof ForbiddenException || error instanceof NotFoundException
        ? error
        : new InternalServerErrorException('Xóa thất bại: ' + error.message);
    } finally {
      await queryRunner.release();
    }
  }
}
