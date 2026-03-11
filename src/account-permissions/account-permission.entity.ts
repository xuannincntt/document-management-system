import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from '../users/user.entity';
import { WorkflowAction } from '../workflow-actions/workflow-action.entity';

@Entity('AccountPermissions')
export class AccountPermission {
    @PrimaryGeneratedColumn({ name: 'PermissionId' })
    permissionId: number;

    @Column({ name: 'UserId' })
    userId: number;

    @Column({ name: 'ActionId' })
    actionId: number;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'UserId' })
    user: User;

    @ManyToOne(() => WorkflowAction)
    @JoinColumn({ name: 'ActionId' })
    action: WorkflowAction;
}
