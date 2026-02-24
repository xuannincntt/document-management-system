// CREATE TABLE DocumentHistories ( 
//     HistoryId INT IDENTITY(1,1) PRIMARY KEY, 
//     DocumentId INT NOT NULL, 
//     ActionBy INT NOT NULL, 
//     ActionType VARCHAR(50) NOT NULL, 
//     Note NVARCHAR(500) NULL, 
//     CreatedAt DATETIME DEFAULT GETDATE(), 

//     CONSTRAINT FK_Histories_Documents FOREIGN KEY (DocumentId) REFERENCES Documents(DocumentId) ON DELETE CASCADE, 
//     CONSTRAINT FK_Histories_Users FOREIGN KEY (ActionBy) REFERENCES Users(UserId) 
// );

import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Document } from '../documents/documents.entity';
import { User } from '../users/user.entity';

@Entity('DocumentHistories')
export class DocumentHistory {
    @PrimaryGeneratedColumn({ name: 'HistoryId' })
    historyId: number;

    @ManyToOne(() => Document, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'DocumentId' })
    document: Document;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'ActionBy' })
    actionBy: User;

    @Column({ name: 'ActionType', length: 50 })
    actionType: string;

    @Column({ name: 'Note', type: 'nvarchar', length: 500, nullable: true })
    note: string;

    @CreateDateColumn({ name: 'CreatedAt' })
    createdAt: Date;
}