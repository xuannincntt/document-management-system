// CREATE TABLE DocumentAttachments(
//     AttachmentId INT IDENTITY(1, 1) PRIMARY KEY,
//     DocumentId INT NOT NULL,
//     FileName NVARCHAR(255) NOT NULL,
//     FilePath VARCHAR(500) NOT NULL,
//     UploadedAt DATETIME DEFAULT GETDATE(),

//     CONSTRAINT FK_Attachments_Documents FOREIGN KEY(DocumentId) REFERENCES Documents(DocumentId) ON DELETE CASCADE
// ); 

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from '../documents/documents.entity';

@Entity('DocumentAttachments')
export class DocumentAttachment {
  @PrimaryGeneratedColumn({ name: 'AttachmentId' })
  attachmentId: number;

  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'DocumentId' })
  document: Document;

  @Column({ name: 'FileName', type: 'nvarchar', length: 255 })
  fileName: string;

  @Column({ name: 'FilePath', length: 500 })
  filePath: string;

  @CreateDateColumn({ name: 'UploadedAt' })
  uploadedAt: Date;
}
