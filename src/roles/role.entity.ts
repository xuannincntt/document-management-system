// CREATE TABLE Roles ( 
//     RoleId INT IDENTITY(1,1) PRIMARY KEY, 
//     RoleCode VARCHAR(50) UNIQUE NOT NULL, 
//     RoleName NVARCHAR(100) NOT NULL, 
//     Description NVARCHAR(255) NULL 
// ); 

import { User } from '../users/user.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('Roles')
export class Role {
    @PrimaryGeneratedColumn()
    RoleId: number;

    @Column({ unique: true, nullable: false })
    RoleCode: string;

    @Column({ nullable: false })
    RoleName: string;

    @Column({ nullable: true })
    Description: string;

    @OneToMany(() => User, (user) => user.Role)
    users: User[];
}
