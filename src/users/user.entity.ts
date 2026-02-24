// CREATE TABLE Users ( 
//     UserId INT IDENTITY(1,1) PRIMARY KEY, 
//     Username VARCHAR(50) UNIQUE NOT NULL, 
//     PasswordHash VARCHAR(255) NOT NULL, 
//     FullName NVARCHAR(100) NOT NULL, 
//     Email VARCHAR(100) NULL, 
//     RoleId INT NOT NULL, 
//     DepartmentId INT NOT NULL,
//     IsActive BIT DEFAULT 1, 
    
//     CONSTRAINT FK_Users_Roles FOREIGN KEY (RoleId) REFERENCES Roles(RoleId),
//     CONSTRAINT FK_Users_Departments FOREIGN KEY (DepartmentId) REFERENCES Departments(DepartmentId)
// );

import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Role } from '../roles/role.entity';
import { Department } from '../departments/department.entity';

@Entity('Users')
export class User {
    @PrimaryGeneratedColumn()
    UserId: number;

    @Column({ unique: true, nullable: false })
    Username: string;

    @Column({ nullable: false })
    PasswordHash: string;

    @Column({ nullable: false })
    FullName: string;

    @Column({ nullable: true })
    Email: string;

    @Column({ nullable: false })
    RoleId: number;

    @Column({ nullable: false })
    DepartmentId: number;

    @Column({ default: true })
    IsActive: boolean;

    @ManyToOne(() => Role, (role) => role.users)
    @JoinColumn({ name: 'RoleId' })
    Role: Role;

    @ManyToOne(() => Department, (department) => department.users)
    @JoinColumn({ name: 'DepartmentId' })
    Department: Department;
}
