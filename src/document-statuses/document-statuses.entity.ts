// CREATE TABLE DocumentStatuses (
// 	StatusId INT IDENTITY(1,1) PRIMARY KEY,
//     StatusCode VARCHAR(50) UNIQUE NOT NULL, 
//     StatusName NVARCHAR(100) NOT NULL,  
//     ColorCode VARCHAR(20) NULL,         
//     SortOrder INT DEFAULT 0             
// );

import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('DocumentStatuses')
export class DocumentStatus {
    @PrimaryGeneratedColumn()
    StatusId: number;

    @Column({ nullable: false })
    StatusCode: string;

    @Column({ nullable: false })
    StatusName: string;

    @Column({ nullable: true })
    ColorCode: string;

    @Column({ nullable: false })
    SortOrder: number;
}
