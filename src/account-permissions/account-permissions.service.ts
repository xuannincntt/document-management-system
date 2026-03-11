import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { AccountPermission } from './account-permission.entity';
import { CreateAccountPermissionDto } from './dto/account-permission.dto';
import { User } from '../users/user.entity';
import { WorkflowAction } from '../workflow-actions/workflow-action.entity';

@Injectable()
export class AccountPermissionsService {
    constructor(
        @InjectRepository(AccountPermission)
        private readonly accountPermissionRepository: Repository<AccountPermission>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(WorkflowAction)
        private readonly workflowActionRepository: Repository<WorkflowAction>,
    ) { }

    async hasPermission(userId: number, actionCode: string): Promise<boolean> {
        const user = await this.userRepository.findOne({
            where: { UserId: userId },
            relations: ['Role']
        });
        if (user?.Role?.RoleCode === 'ADMIN') {
            return true;
        }
        const permission = await this.accountPermissionRepository.findOne({
            where: {
                userId,
                action: { actionCode },
            },
            relations: ['action'],
        });
        return !!permission;
    }

    async getPermissionsByUser(userId: number): Promise<AccountPermission[]> {
        const user = await this.userRepository.findOne({
            where: { UserId: userId },
            relations: ['Role']
        });
        if (user?.Role?.RoleCode === 'ADMIN') {
            return [];
        }
        return this.accountPermissionRepository.find({
            where: { userId },
            relations: ['action'],
        });
    }

    async create(createDto: CreateAccountPermissionDto): Promise<{ message: string; createdCount: number }> {
        const { userIds, actionIds } = createDto;
        // 1. Kiểm tra người dùng
        const targetUsers = await this.userRepository.find({
            where: { UserId: In(userIds) },
            relations: ['Role']
        });
        const userMap = new Map(targetUsers.map(u => [u.UserId, u]));
        for (const userId of userIds) {
            const user = userMap.get(userId);
            if (!user) {
                throw new NotFoundException(`Không tìm thấy người dùng với ID: ${userId}`);
            }
            if (user.Role?.RoleCode === 'ADMIN') {
                throw new ForbiddenException(`Không thể thay đổi quyền hạn của tài khoản quản trị viên (ADMIN) - UserID: ${userId}`);
            }
        }
        // 2. Kiểm tra thao tác (ActionIds) để tránh lỗi FK
        const targetActions = await this.workflowActionRepository.find({
            where: { actionId: In(actionIds) }
        });
        if (targetActions.length !== actionIds.length) {
            const foundActionIds = targetActions.map(a => a.actionId);
            const missingActionIds = actionIds.filter(id => !foundActionIds.includes(id));
            throw new NotFoundException(`Không tìm thấy thao tác với ID: ${missingActionIds.join(', ')}`);
        }
        // 3. Lấy danh sách các quyền đã tồn tại
        const existingPermissions = await this.accountPermissionRepository.find({
            where: {
                userId: In(userIds),
                actionId: In(actionIds)
            }
        });
        const existingSet = new Set(existingPermissions.map(p => `${p.userId}-${p.actionId}`));
        // 4. Chuẩn bị danh sách mới
        const newPermissions: Partial<AccountPermission>[] = [];
        for (const userId of userIds) {
            for (const actionId of actionIds) {
                if (!existingSet.has(`${userId}-${actionId}`)) {
                    newPermissions.push({
                        userId,
                        actionId
                    });
                }
            }
        }
        // 5. Bulk save
        if (newPermissions.length > 0) {
            await this.accountPermissionRepository.save(newPermissions);
        }
        return {
            message: `Gán thành công ${newPermissions.length} quyền hạn mới cho người dùng.`,
            createdCount: newPermissions.length
        };
    }

    async remove(id: number): Promise<{ message: string }> {
        const permission = await this.accountPermissionRepository.findOne({ where: { permissionId: id } });
        if (!permission) throw new NotFoundException('Không tìm thấy quyền hạn');
        await this.accountPermissionRepository.remove(permission);
        return { message: 'Xóa quyền hạn thành công' };
    }
}
