// CREATE TABLE Documents ( 
//     DocumentId INT IDENTITY(1,1) PRIMARY KEY, 
//     Title NVARCHAR(255) NOT NULL, 
//     Content NVARCHAR(MAX) NULL, 
//     CreatedBy INT NOT NULL,
//     StatusCode VARCHAR(50) NOT NULL DEFAULT 1,
//     CreatedAt DATETIME DEFAULT GETDATE(), 
//     UpdatedAt DATETIME DEFAULT GETDATE(), 

//     CONSTRAINT FK_Documents_Users FOREIGN KEY (CreatedBy) REFERENCES Users(UserId),
//     CONSTRAINT FK_Documents_Statuses FOREIGN KEY (StatusCode) REFERENCES DocumentStatuses(StatusCode)
// ); 

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';
import { DocumentStatus } from '../document-statuses/document-statuses.entity';

@Entity('Documents')
export class Document {
  @PrimaryGeneratedColumn({ name: 'DocumentId' })
  documentId: number;

  @Column({ name: 'Title', type: 'nvarchar', length: 255 })
  title: string;

  @Column({ name: 'Content', type: 'nvarchar', length: 'MAX', nullable: true })
  content: string;

  // Liên kết đến người tạo (User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'CreatedBy' })
  createdBy: User;

  // Liên kết đến Trạng thái (DocumentStatus) theo StatusCode
  @ManyToOne(() => DocumentStatus)
  @JoinColumn({ name: 'StatusCode', referencedColumnName: 'StatusCode' })
  status: DocumentStatus;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;
}
