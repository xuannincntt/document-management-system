// CREATE TABLE Departments (
//     DepartmentId INT IDENTITY(1,1) PRIMARY KEY,
//     DepartmentName NVARCHAR(150) NOT NULL,
//     Description NVARCHAR(255) NULL
// );

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from '../users/user.entity';

@Entity('Departments')
export class Department {
    @PrimaryGeneratedColumn()
    DepartmentId: number;

    @Column({ nullable: false })
    DepartmentName: string;

    @Column({ nullable: true })
    Description: string;

    @OneToMany(() => User, (user) => user.Department)
    users: User[];
}