// CREATE TABLE DocumentTasks ( 
//     TaskId INT IDENTITY(1,1) PRIMARY KEY, 
//     DocumentId INT NOT NULL, 
//     AssignerId INT NOT NULL, 
//     AssigneeId INT NOT NULL, 
//     TaskStatus VARCHAR(50) NOT NULL DEFAULT 'PENDING', 
//     DueDate DATETIME NULL, 
//     CompletedAt DATETIME NULL, 
//     CreatedAt DATETIME DEFAULT GETDATE(), 
    
//     CONSTRAINT FK_Tasks_Documents FOREIGN KEY (DocumentId) REFERENCES Documents(DocumentId) ON DELETE CASCADE, 
//     CONSTRAINT FK_Tasks_Assigner FOREIGN KEY (AssignerId) REFERENCES Users(UserId), 
//     CONSTRAINT FK_Tasks_Assignee FOREIGN KEY (AssigneeId) REFERENCES Users(UserId) 
// ); 

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from '../documents/documents.entity';
import { User } from '../users/user.entity';

@Entity('DocumentTasks')
export class DocumentTask {
  @PrimaryGeneratedColumn({ name: 'TaskId' })
  taskId: number;

  @ManyToOne(() => Document, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'DocumentId' })
  document: Document;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'AssignerId' })
  assigner: User; // Người giao việc

  @ManyToOne(() => User)
  @JoinColumn({ name: 'AssigneeId' })
  assignee: User; // Người nhận việc (xử lý)

  @Column({ name: 'TaskStatus', length: 50, default: 'PENDING' })
  taskStatus: string;

  @Column({ name: 'DueDate', type: 'datetime', nullable: true })
  dueDate: Date;

  @Column({ name: 'CompletedAt', type: 'datetime', nullable: true })
  completedAt: Date;

  @CreateDateColumn({ name: 'CreatedAt' })
  createdAt: Date;
}
