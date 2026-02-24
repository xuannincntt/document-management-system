// CREATE TABLE WorkflowPermissions (
//     PermissionId INT IDENTITY(1,1) PRIMARY KEY,
//     RoleId INT NOT NULL,                 
//     StatusId INT NOT NULL,     -- Tham chiếu khóa ngoại tới bảng Status bằng ID
//     AllowedAction VARCHAR(50) NOT NULL,  
    
//     CONSTRAINT FK_WorkflowPerm_Roles FOREIGN KEY (RoleId) REFERENCES Roles(RoleId) ON DELETE CASCADE,
//     CONSTRAINT FK_WorkflowPerm_Statuses FOREIGN KEY (StatusId) REFERENCES DocumentStatuses(StatusId) ON DELETE CASCADE,
//     CONSTRAINT UQ_Role_Status_Action UNIQUE (RoleId, StatusId, AllowedAction) 
// );

import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Unique } from 'typeorm';
import { Role } from '../roles/role.entity';
import { DocumentStatus } from '../document-statuses/document-statuses.entity';

@Entity('WorkflowPermissions')
@Unique('UQ_Role_Status_Action', ['role', 'status', 'allowedAction'])
export class WorkflowPermission {
  @PrimaryGeneratedColumn({ name: 'PermissionId' })
  permissionId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'RoleId' })
  role: Role;

  @ManyToOne(() => DocumentStatus)
  @JoinColumn({ name: 'StatusId' })
  status: DocumentStatus;

  @Column({ name: 'AllowedAction', length: 50 })
  allowedAction: string;
}
