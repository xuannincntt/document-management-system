// CREATE TABLE Documents ( 
//     DocumentId INT IDENTITY(1,1) PRIMARY KEY, 
//     Title NVARCHAR(255) NOT NULL, 
//     Content NVARCHAR(MAX) NULL, 
//     SenderId INT NOT NULL,
//     ReceiverId INT NULL,
//     StatusId INT NOT NULL DEFAULT 1,
//     CreatedAt DATETIME DEFAULT GETDATE(), 
//     UpdatedAt DATETIME DEFAULT GETDATE(), 
    
//     CONSTRAINT FK_Documents_Sender FOREIGN KEY (SenderId) REFERENCES Users(UserId),
//     CONSTRAINT FK_Documents_Receiver FOREIGN KEY (ReceiverId) REFERENCES Users(UserId),
//     CONSTRAINT FK_Documents_Statuses FOREIGN KEY (StatusId) REFERENCES DocumentStatuses(StatusId)
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

  // Liên kết đến người gửi (User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'SenderId' })
  sender: User;

  // Liên kết đến người nhận (User)
  @ManyToOne(() => User)
  @JoinColumn({ name: 'ReceiverId' })
  receiver: User;

  // Liên kết đến Trạng thái (DocumentStatus) theo StatusCode
  @ManyToOne(() => DocumentStatus)
  @JoinColumn({ name: 'StatusId', referencedColumnName: 'StatusId' })
  status: DocumentStatus;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UpdatedAt' })
  updatedAt: Date;
}
