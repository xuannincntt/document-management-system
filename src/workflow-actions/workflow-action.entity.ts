import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('WorkflowActions')
export class WorkflowAction {
    @PrimaryGeneratedColumn({ name: 'ActionId' })
    actionId: number;

    @Column({ name: 'ActionCode', length: 50, unique: true })
    actionCode: string;

    @Column({ name: 'ActionName', type: 'nvarchar', length: 100 })
    actionName: string;

    @Column({ name: 'Description', type: 'nvarchar', length: 255, nullable: true })
    description: string;

    @Column({ name: 'IsActive', default: true })
    isActive: boolean;

    @CreateDateColumn({ name: 'CreatedAt' })
    createdAt: Date;
}
